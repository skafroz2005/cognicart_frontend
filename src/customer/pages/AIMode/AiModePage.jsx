import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../config/apiConfig';
import { addItemToCart } from '../../../State/Cart/Action';

const quickPrompts = [
  'Find premium black shirts under 2000',
  'Show wedding-ready kurta options',
  'Add the first result to cart',
  'Go to checkout',
];

const getSafeTitle = (product) => product?.title || 'Untitled Product';
const getSafeImage = (product) => product?.imageUrl || product?.images?.[0] || '';
const getSafePrice = (product) => Number(product?.discountedPrice || product?.price || 0);

const AiModePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector((store) => store.auth?.user);
  const recognitionRef = useRef(null);

  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState('');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [resultView, setResultView] = useState('grid');
  const [isThinking, setIsThinking] = useState(false);
  const [isLoadingSessions, setIsLoadingSessions] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [engineMeta, setEngineMeta] = useState({ usedAi: false, provider: 'Google Gemini', model: 'gemini-3-flash-preview' });
  const [engineError, setEngineError] = useState('');

  const mapMessage = (message) => ({
    id: message.id,
    role: message.role,
    text: message.content,
    timestamp: message.createdAt,
  });

  const loadSessions = async () => {
    setIsLoadingSessions(true);
    try {
      const { data } = await api.get('/api/ai-mode/sessions');
      const list = Array.isArray(data) ? data : [];
      setSessions(list);

      if (list.length > 0) {
        setActiveSessionId(list[0].id);
      } else {
        await createSession();
      }
    } catch (error) {
      console.error('Failed to load AI sessions', error);
      setSessions([]);
    } finally {
      setIsLoadingSessions(false);
    }
  };

  const createSession = async () => {
    try {
      const { data } = await api.post('/api/ai-mode/sessions', { title: 'New Shopping Chat' });
      const session = data || null;
      if (!session) {
        return;
      }
      setSessions((prev) => [session, ...prev]);
      setActiveSessionId(session.id);
      setMessages([]);
      setResults([]);
      setPendingAction(null);
    } catch (error) {
      console.error('Failed to create AI session', error);
    }
  };

  useEffect(() => {
    if (!authUser) {
      navigate('/');
      return;
    }
    loadSessions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);

  useEffect(() => {
    if (!activeSessionId) {
      return;
    }

    const loadMessages = async () => {
      try {
        const { data } = await api.get(`/api/ai-mode/sessions/${activeSessionId}/messages`);
        const list = Array.isArray(data) ? data.map(mapMessage) : [];
        setMessages(list);
      } catch (error) {
        console.error('Failed to load AI messages', error);
        setMessages([]);
      }
    };

    loadMessages();
  }, [activeSessionId]);

  const appendMessage = (role, text) => {
    if (!activeSessionId || !String(text || '').trim()) {
      return;
    }
    setMessages((prev) => [...prev, {
      id: `local_${Date.now()}`,
      role,
      text,
      timestamp: new Date().toISOString(),
    }]);
  };

  const runClientAction = async (action, serverResults) => {
    if (!action?.type) {
      return;
    }

    if (action.type === 'go_to_checkout') {
      if (action.requiresConfirmation) {
        setPendingAction({ type: 'checkout' });
      } else {
        navigate('/checkout');
      }
      return;
    }

    if (action.type === 'add_to_cart') {
      const fromPayload = action.productId
        ? (serverResults || []).find((product) => product.id === action.productId)
        : (serverResults || [])[0];

      const target = fromPayload || (results || []).find((product) => product.id === action.productId) || results[0];
      if (!target) {
        return;
      }

      await dispatch(addItemToCart({ productId: target.id, size: 'M', quantity: 1 }));
      appendMessage('assistant', `Added ${getSafeTitle(target)} to cart instantly.`);
    }
  };

  const handleSend = async (message) => {
    const text = String(message || input).trim();
    if (!text || !activeSessionId) {
      return;
    }

    setInput('');
    setIsThinking(true);

    try {
      const { data } = await api.post('/api/ai-mode/chat', {
        sessionId: activeSessionId,
        message: text,
      });

      const userMessage = data?.userMessage ? mapMessage(data.userMessage) : null;
      const assistantMessage = data?.assistantMessage ? mapMessage(data.assistantMessage) : null;
      const nextResults = Array.isArray(data?.products) ? data.products : [];

      if (userMessage && assistantMessage) {
        setMessages((prev) => [...prev, userMessage, assistantMessage]);
      } else if (assistantMessage) {
        setMessages((prev) => [...prev, assistantMessage]);
      }

      setResults(nextResults);
      setEngineMeta({
        usedAi: Boolean(data?.usedAi),
        provider: data?.provider || 'Google Gemini',
        model: data?.model || 'gemini-3-flash-preview',
      });
      setEngineError(data?.aiError || '');

      if (data?.action) {
        await runClientAction(data.action, nextResults);
      } else {
        setPendingAction(null);
      }

      setSessions((prev) => prev.map((session) => (
        session.id === activeSessionId
          ? { ...session, updatedAt: new Date().toISOString(), title: session.title === 'New Shopping Chat' ? text.slice(0, 40) : session.title }
          : session
      )));
    } catch (error) {
      const messageText = error?.response?.data?.message || error?.message || 'Assistant action failed.';
      appendMessage('assistant', `I hit an issue: ${messageText}`);
    } finally {
      setIsThinking(false);
    }
  };

  const handleConfirmAction = () => {
    if (!pendingAction) {
      return;
    }

    if (pendingAction.type === 'checkout') {
      appendMessage('assistant', 'Confirmed. Redirecting you to checkout.');
      setPendingAction(null);
      setTimeout(() => navigate('/checkout'), 350);
    }
  };

  const handleCancelAction = () => {
    if (!pendingAction) {
      return;
    }
    appendMessage('assistant', 'Action cancelled.');
    setPendingAction(null);
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      appendMessage('assistant', 'Voice input is not supported in this browser yet.');
      return;
    }

    if (!recognitionRef.current) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => {
        setIsListening(false);
        appendMessage('assistant', 'Voice input failed. Please try once more.');
      };
      recognition.onresult = (event) => {
        const transcript = event.results?.[0]?.[0]?.transcript || '';
        if (transcript) {
          setInput(transcript);
        }
      };

      recognitionRef.current = recognition;
    }

    if (isListening) {
      recognitionRef.current.stop();
      return;
    }

    recognitionRef.current.start();
  };

  return (
    <div className="min-h-screen bg-[#f4f6fb] py-6 px-4 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl border border-[#d9e0ef] bg-white shadow-[0_20px_70px_rgba(22,39,89,0.08)] overflow-hidden">
          <div className="border-b border-[#e6ebf5] bg-gradient-to-r from-[#09162f] via-[#13294f] to-[#0f203f] text-white px-6 py-5">
            <h1 className="text-2xl font-semibold tracking-tight">Cognicart AI Mode</h1>
            <p className="text-sm text-[#c7d4f4] mt-1">Premium stylist assistant. Gemini-powered shopping conversations with live product actions.</p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 min-h-[76vh]">
            <aside className="xl:col-span-4 border-r border-[#e6ebf5] bg-[#fcfdff]">
              <div className="p-4 border-b border-[#e6ebf5] flex items-center justify-between">
                <h2 className="text-sm font-semibold text-[#1f2a44]">Conversations</h2>
                <button
                  type="button"
                  onClick={createSession}
                  className="text-xs px-3 py-1.5 rounded-lg bg-[#13294f] text-white hover:bg-[#0f203f]"
                >
                  New Chat
                </button>
              </div>

              <div className="max-h-44 overflow-y-auto border-b border-[#e6ebf5]">
                {sessions.map((session) => (
                  <button
                    key={session.id}
                    type="button"
                    onClick={() => setActiveSessionId(session.id)}
                    className={`w-full text-left px-4 py-3 border-b border-[#f1f4fa] hover:bg-[#f2f6ff] ${session.id === activeSessionId ? 'bg-[#e8efff]' : ''}`}
                  >
                    <p className="text-sm font-medium text-[#1f2a44] truncate">{session.title}</p>
                    <p className="text-xs text-[#6f7f9c] mt-1">{new Date(session.updatedAt).toLocaleString()}</p>
                  </button>
                ))}
              </div>

              <div className="p-4 space-y-3">
                <div className="rounded-xl border border-[#dbe5fb] bg-[#f5f9ff] p-3">
                  <p className="text-xs font-semibold text-[#22345f] mb-2">Quick Prompts</p>
                  <div className="flex flex-wrap gap-2">
                    {quickPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => handleSend(prompt)}
                        className="text-xs rounded-full px-3 py-1.5 bg-white border border-[#cfdaf3] hover:bg-[#edf3ff] text-[#1f2a44]"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="h-[360px] overflow-y-auto rounded-xl border border-[#e6ebf5] bg-white p-3 space-y-3">
                  {messages.map((message, index) => (
                    <div key={`${message.timestamp}-${index}`} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm ${message.role === 'user' ? 'bg-[#162d5a] text-white' : 'bg-[#eef3ff] text-[#17233f]'}`}>
                        {message.text}
                      </div>
                    </div>
                  ))}
                  {isThinking && (
                    <div className="text-xs text-[#6f7f9c]">AI stylist is thinking...</div>
                  )}
                </div>

                {pendingAction && (
                  <div className="rounded-xl border border-[#e6ebf5] bg-[#fff8ea] p-3">
                    <p className="text-sm text-[#6f5200]">Confirm action: checkout navigation</p>
                    <div className="mt-2 flex gap-2">
                      <button type="button" onClick={handleConfirmAction} className="px-3 py-1.5 text-xs rounded-lg bg-[#1f7a39] text-white">Confirm</button>
                      <button type="button" onClick={handleCancelAction} className="px-3 py-1.5 text-xs rounded-lg border border-[#b8a36a] text-[#6f5200]">Cancel</button>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSend();
                      }
                    }}
                    placeholder="Ask for products, styles, actions..."
                    className="flex-1 border border-[#d6deef] rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#96b0ea]"
                  />
                  <button
                    type="button"
                    onClick={handleVoiceInput}
                    className={`px-3 py-2 rounded-xl border text-sm ${isListening ? 'bg-[#ffe3e3] border-[#f2aaaa] text-[#7a1f1f]' : 'bg-white border-[#d6deef] text-[#1f2a44]'}`}
                  >
                    {isListening ? 'Stop' : 'Voice'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSend()}
                    className="px-4 py-2 rounded-xl bg-[#13294f] text-white text-sm hover:bg-[#0f203f]"
                  >
                    Send
                  </button>
                </div>
              </div>
            </aside>

            <section className="xl:col-span-8 bg-[#f8faff]">
              <div className="p-4 border-b border-[#e6ebf5] flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-[#1f2a44]">Live Results</h2>
                  <p className="text-xs text-[#6f7f9c]">Agent-updated products based on your conversation</p>
                  <p className="text-[11px] mt-1 text-[#4e628b]">
                    Engine: {engineMeta.provider} | Model: {engineMeta.model} | Response Mode: {engineMeta.usedAi ? 'Gemini AI' : 'Fallback Logic'}
                  </p>
                  {!!engineError && (
                    <p className="text-[11px] mt-1 text-[#9a5a00]">AI error: {engineError}</p>
                  )}
                </div>

                <div className="inline-flex rounded-lg border border-[#d6deef] overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setResultView('grid')}
                    className={`px-3 py-1.5 text-xs ${resultView === 'grid' ? 'bg-[#13294f] text-white' : 'bg-white text-[#1f2a44]'}`}
                  >
                    Grid
                  </button>
                  <button
                    type="button"
                    onClick={() => setResultView('list')}
                    className={`px-3 py-1.5 text-xs ${resultView === 'list' ? 'bg-[#13294f] text-white' : 'bg-white text-[#1f2a44]'}`}
                  >
                    List
                  </button>
                </div>
              </div>

              <div className="p-4">
                {isLoadingSessions && (
                  <div className="text-sm text-[#6f7f9c] mb-3">Loading conversations...</div>
                )}

                {results.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-[#c9d6f4] bg-white p-10 text-center">
                    <p className="text-[#22345f] font-medium">No results yet</p>
                    <p className="text-sm text-[#6f7f9c] mt-2">Ask the assistant to search products. Example: "Find premium linen shirts".</p>
                  </div>
                ) : (
                  <div className={resultView === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4' : 'space-y-3'}>
                    {results.map((product) => (
                      <div key={product.id} className={`rounded-2xl border border-[#dce5f7] bg-white overflow-hidden ${resultView === 'list' ? 'flex gap-3 p-3 items-center' : ''}`}>
                        <img
                          src={getSafeImage(product) || 'https://via.placeholder.com/320x220?text=Product'}
                          alt={getSafeTitle(product)}
                          className={resultView === 'list' ? 'h-24 w-28 object-cover rounded-lg' : 'h-40 w-full object-cover'}
                        />
                        <div className={resultView === 'list' ? 'flex-1 min-w-0' : 'p-3'}>
                          <p className="text-sm font-semibold text-[#1f2a44] truncate">{getSafeTitle(product)}</p>
                          <p className="text-xs text-[#6f7f9c] mt-1 line-clamp-2">{product.description || 'No description available.'}</p>
                          <div className="mt-3 flex items-center justify-between">
                            <span className="text-sm font-semibold text-[#0b6631]">Rs. {getSafePrice(product)}</span>
                            <button
                              type="button"
                              onClick={() => dispatch(addItemToCart({ productId: product.id, size: 'M', quantity: 1 }))}
                              className="text-xs px-3 py-1.5 rounded-lg bg-[#13294f] text-white hover:bg-[#0f203f]"
                            >
                              Add To Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiModePage;
