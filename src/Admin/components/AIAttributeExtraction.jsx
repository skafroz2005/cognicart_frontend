import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { api } from '../../config/apiConfig';
import {
  clearExtractionResult,
  clearProductMessages,
  createProduct,
  extractProductAttributes,
} from '../../State/Product/Action';

const defaultSizes = [
  { name: 'S', quantity: 1 },
  { name: 'M', quantity: 1 },
  { name: 'L', quantity: 1 },
];

const AIAttributeExtraction = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { extractionResult, extractionLoading, extractionError, loading } = useSelector((store) => store.products);

  const [inputData, setInputData] = useState({
    imageUrl: '',
    title: '',
    description: '',
    topLevelCategory: 'men',
    secondLevelCategory: 'clothing',
    thirdLevelCategory: 'shirt',
    price: '',
    quantity: '',
  });

  const [editableData, setEditableData] = useState(null);
  const [confirmCreate, setConfirmCreate] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [aiHealth, setAiHealth] = useState({ loading: true, data: null, error: '' });

  const fetchAiHealth = async () => {
    try {
      setAiHealth((prev) => ({ ...prev, loading: true, error: '' }));
      const { data } = await api.get('/api/admin/products/ai-health');
      setAiHealth({ loading: false, data, error: '' });
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || 'Failed to load AI health status.';
      setAiHealth({ loading: false, data: null, error: message });
    }
  };

  useEffect(() => {
    fetchAiHealth();
  }, []);

  useEffect(() => {
    if (!extractionResult) {
      return;
    }

    setEditableData({
      imageUrl: extractionResult.imageUrl || '',
      imagesText: Array.isArray(extractionResult.images) ? extractionResult.images.join(', ') : '',
      brand: extractionResult.brand || '',
      title: extractionResult.title || '',
      color: extractionResult.color || '',
      tagsText: Array.isArray(extractionResult.tags) ? extractionResult.tags.join(', ') : '',
      discountedPrice: extractionResult.discountedPrice ?? 0,
      price: extractionResult.price ?? 0,
      discountPercent: extractionResult.discountPercent ?? 0,
      quantity: extractionResult.quantity ?? 1,
      topLevelCategory: extractionResult.topLevelCategory || 'men',
      secondLevelCategory: extractionResult.secondLevelCategory || 'clothing',
      thirdLevelCategory: extractionResult.thirdLevelCategory || 'shirt',
      description: extractionResult.description || '',
      size: Array.isArray(extractionResult.size) && extractionResult.size.length > 0
        ? extractionResult.size
        : defaultSizes,
      confidence: extractionResult.confidence ?? 0,
      note: extractionResult.note || '',
    });
    setConfirmCreate(false);
    setSubmitError('');
  }, [extractionResult]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditableChange = (e) => {
    const { name, value } = e.target;
    setEditableData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSizeChange = (index, name, value) => {
    setEditableData((prev) => {
      const nextSizes = [...prev.size];
      nextSizes[index] = {
        ...nextSizes[index],
        [name]: name === 'quantity' ? Number(value) : value,
      };
      return { ...prev, size: nextSizes };
    });
  };

  const handleExtract = (e) => {
    e.preventDefault();
    setSubmitError('');
    dispatch(clearProductMessages());
    dispatch(extractProductAttributes({
      ...inputData,
      price: Number(inputData.price || 0),
      quantity: Number(inputData.quantity || 1),
    }));
  };

  const isCreateFormValid = () => {
    if (!editableData) {
      return false;
    }

    const requiredStrings = [
      editableData.imageUrl,
      editableData.title,
      editableData.description,
      editableData.topLevelCategory,
      editableData.secondLevelCategory,
      editableData.thirdLevelCategory,
    ];

    const hasAllRequiredStrings = requiredStrings.every((value) => String(value || '').trim().length > 0);
    const hasValidPrice = Number(editableData.price) > 0;
    const hasValidQuantity = Number(editableData.quantity) > 0;

    return hasAllRequiredStrings && hasValidPrice && hasValidQuantity;
  };

  const handleCreateProduct = async () => {
    if (!editableData) {
      return;
    }

    if (!confirmCreate) {
      setSubmitError('Please confirm the reviewed catalog data before creating the product.');
      return;
    }

    if (!isCreateFormValid()) {
      setSubmitError('Please complete all required fields (title, image URL, description, categories, price and quantity).');
      return;
    }

    setSubmitError('');

    const payload = {
      imageUrl: editableData.imageUrl,
      images: editableData.imagesText
        .split(',')
        .map((url) => url.trim())
        .filter((url) => url.length > 0),
      brand: editableData.brand,
      title: editableData.title,
      color: editableData.color,
      tags: editableData.tagsText
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0),
      discountedPrice: Number(editableData.discountedPrice || 0),
      price: Number(editableData.price || 0),
      discountPercent: Number(editableData.discountPercent || 0),
      size: editableData.secondLevelCategory === 'clothing'
        ? (editableData.size || []).map((entry) => ({
          name: entry.name,
          quantity: Number(entry.quantity || 0),
        }))
        : [],
      quantity: Number(editableData.quantity || 0),
      topLevelCategory: editableData.topLevelCategory,
      secondLevelCategory: editableData.secondLevelCategory,
      thirdLevelCategory: editableData.thirdLevelCategory,
      description: editableData.description,
    };

    const result = await dispatch(createProduct(payload));
    if (!result?.success) {
      setSubmitError(result?.error || 'Failed to create product.');
      return;
    }

    setShowSuccessToast(true);
    dispatch(clearExtractionResult());
    dispatch(clearProductMessages());

    setTimeout(() => {
      navigate('/admin/products');
    }, 800);
  };

  return (
    <div className="p-6 lg:p-8 bg-[#f8fafc] min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">AI Attribute Extraction</h1>
        <p className="text-sm text-gray-500 mt-1">Upload core product details, auto-generate attributes, then review before saving.</p>
      </div>

      {aiHealth.loading && (
        <Alert severity="info" sx={{ mb: 3 }}>
          Checking Gemini API health...
        </Alert>
      )}

      {!aiHealth.loading && aiHealth.error && (
        <Alert severity="warning" sx={{ mb: 3 }} action={<Button color="inherit" size="small" onClick={fetchAiHealth}>Retry</Button>}>
          Could not fetch AI health status: {aiHealth.error}
        </Alert>
      )}

      {!aiHealth.loading && aiHealth.data && (
        <Alert
          severity={aiHealth.data.status === 'UP' ? 'success' : aiHealth.data.status === 'DEGRADED' ? 'warning' : 'error'}
          sx={{ mb: 3 }}
          action={<Button color="inherit" size="small" onClick={fetchAiHealth}>Refresh</Button>}
        >
          AI Provider: {aiHealth.data.provider} | Status: {aiHealth.data.status} | Model: {aiHealth.data.activeModel}
          {aiHealth.data.message ? ` | ${aiHealth.data.message}` : ''}
        </Alert>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8 mb-6">
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Step 1: Input for AI Extraction</Typography>
        <form onSubmit={handleExtract}>
          <div className="mui-grid-container-div mui-spacing-3">
            <div className="mui-grid-item-div mui-col-xs-12">
              <TextField fullWidth label="Image URL" name="imageUrl" value={inputData.imageUrl} onChange={handleInputChange} required />
            </div>
            <div className="mui-grid-item-div mui-col-xs-12 mui-col-sm-6">
              <TextField fullWidth label="Title" name="title" value={inputData.title} onChange={handleInputChange} required />
            </div>
            <div className="mui-grid-item-div mui-col-xs-12 mui-col-sm-3">
              <TextField fullWidth type="number" label="Price" name="price" value={inputData.price} onChange={handleInputChange} required />
            </div>
            <div className="mui-grid-item-div mui-col-xs-12 mui-col-sm-3">
              <TextField fullWidth type="number" label="Quantity" name="quantity" value={inputData.quantity} onChange={handleInputChange} required />
            </div>
            <div className="mui-grid-item-div mui-col-xs-12 mui-col-sm-4">
              <FormControl fullWidth>
                <InputLabel>Top Level Category</InputLabel>
                <Select name="topLevelCategory" value={inputData.topLevelCategory} label="Top Level Category" onChange={handleInputChange}>
                  <MenuItem value="men">Men</MenuItem>
                  <MenuItem value="women">Women</MenuItem>
                  <MenuItem value="kids">Kids</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="mui-grid-item-div mui-col-xs-12 mui-col-sm-4">
              <FormControl fullWidth>
                <InputLabel>Second Level Category</InputLabel>
                <Select name="secondLevelCategory" value={inputData.secondLevelCategory} label="Second Level Category" onChange={handleInputChange}>
                  <MenuItem value="clothing">Clothing</MenuItem>
                  <MenuItem value="accessories">Accessories</MenuItem>
                  <MenuItem value="brands">Brands</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="mui-grid-item-div mui-col-xs-12 mui-col-sm-4">
              <TextField fullWidth label="Third Level Category" name="thirdLevelCategory" value={inputData.thirdLevelCategory} onChange={handleInputChange} placeholder="e.g., shirt, kurta, dress" />
            </div>
            <div className="mui-grid-item-div mui-col-xs-12">
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={inputData.description}
                onChange={handleInputChange}
                multiline
                rows={3}
                required
              />
            </div>
            <div className="mui-grid-item-div mui-col-xs-12">
              <Button
                type="submit"
                variant="contained"
                disabled={extractionLoading}
                sx={{
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 3,
                  bgcolor: '#4f46e5',
                  '&:hover': { bgcolor: '#4338ca' },
                }}
              >
                {extractionLoading ? 'Extracting...' : 'Extract Attributes'}
              </Button>
            </div>
          </div>
        </form>

        {extractionError && (
          <Alert severity="error" sx={{ mt: 3 }}>
            Extraction failed: {extractionError}
          </Alert>
        )}
      </div>

      {editableData && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Step 2: Review & Edit Before Save</Typography>

          {!!editableData.note && (
            <Alert severity="info" sx={{ mb: 3 }}>
              {editableData.note} Confidence: {(Number(editableData.confidence || 0) * 100).toFixed(0)}%
            </Alert>
          )}

          {!!submitError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {submitError}
            </Alert>
          )}

          <div className="mui-grid-container-div mui-spacing-3">
            <div className="mui-grid-item-div mui-col-xs-12 mui-col-sm-6">
              <TextField fullWidth label="Brand" name="brand" value={editableData.brand} onChange={handleEditableChange} />
            </div>
            <div className="mui-grid-item-div mui-col-xs-12 mui-col-sm-6">
              <TextField fullWidth label="Title" name="title" value={editableData.title} onChange={handleEditableChange} />
            </div>
            <div className="mui-grid-item-div mui-col-xs-12 mui-col-sm-6">
              <TextField fullWidth label="Color" name="color" value={editableData.color} onChange={handleEditableChange} />
            </div>
            <div className="mui-grid-item-div mui-col-xs-12 mui-col-sm-6">
              <TextField fullWidth label="Image URL" name="imageUrl" value={editableData.imageUrl} onChange={handleEditableChange} />
            </div>
            <div className="mui-grid-item-div mui-col-xs-12">
              <TextField fullWidth label="Gallery Image URLs (comma separated)" name="imagesText" value={editableData.imagesText} onChange={handleEditableChange} />
            </div>
            <div className="mui-grid-item-div mui-col-xs-12">
              <TextField fullWidth label="Tags (comma separated)" name="tagsText" value={editableData.tagsText} onChange={handleEditableChange} />
            </div>

            <div className="mui-grid-item-div mui-col-xs-12 mui-col-sm-3">
              <TextField fullWidth type="number" label="Price" name="price" value={editableData.price} onChange={handleEditableChange} />
            </div>
            <div className="mui-grid-item-div mui-col-xs-12 mui-col-sm-3">
              <TextField fullWidth type="number" label="Discounted Price" name="discountedPrice" value={editableData.discountedPrice} onChange={handleEditableChange} />
            </div>
            <div className="mui-grid-item-div mui-col-xs-12 mui-col-sm-3">
              <TextField fullWidth type="number" label="Discount Percent" name="discountPercent" value={editableData.discountPercent} onChange={handleEditableChange} />
            </div>
            <div className="mui-grid-item-div mui-col-xs-12 mui-col-sm-3">
              <TextField fullWidth type="number" label="Quantity" name="quantity" value={editableData.quantity} onChange={handleEditableChange} />
            </div>

            <div className="mui-grid-item-div mui-col-xs-12 mui-col-sm-4">
              <FormControl fullWidth>
                <InputLabel>Top Level Category</InputLabel>
                <Select name="topLevelCategory" value={editableData.topLevelCategory} label="Top Level Category" onChange={handleEditableChange}>
                  <MenuItem value="men">Men</MenuItem>
                  <MenuItem value="women">Women</MenuItem>
                  <MenuItem value="kids">Kids</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="mui-grid-item-div mui-col-xs-12 mui-col-sm-4">
              <FormControl fullWidth>
                <InputLabel>Second Level Category</InputLabel>
                <Select name="secondLevelCategory" value={editableData.secondLevelCategory} label="Second Level Category" onChange={handleEditableChange}>
                  <MenuItem value="clothing">Clothing</MenuItem>
                  <MenuItem value="accessories">Accessories</MenuItem>
                  <MenuItem value="brands">Brands</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="mui-grid-item-div mui-col-xs-12 mui-col-sm-4">
              <TextField fullWidth label="Third Level Category" name="thirdLevelCategory" value={editableData.thirdLevelCategory} onChange={handleEditableChange} placeholder="e.g., shirt, kurta, dress" />
            </div>

            <div className="mui-grid-item-div mui-col-xs-12">
              <TextField fullWidth multiline rows={3} label="Description" name="description" value={editableData.description} onChange={handleEditableChange} />
            </div>

            {editableData.secondLevelCategory === 'clothing' && (editableData.size || []).map((entry, index) => (
              <div className="mui-grid-item-div mui-col-xs-12" key={`${entry.name}-${index}`}>
                <div className="mui-grid-container-div mui-spacing-3">
                  <div className="mui-grid-item-div mui-col-xs-6">
                    <TextField
                      fullWidth
                      label="Size Name"
                      value={entry.name}
                      onChange={(e) => handleSizeChange(index, 'name', e.target.value)}
                    />
                  </div>
                  <div className="mui-grid-item-div mui-col-xs-6">
                    <TextField
                      fullWidth
                      type="number"
                      label="Size Quantity"
                      value={entry.quantity}
                      onChange={(e) => handleSizeChange(index, 'quantity', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="mui-grid-item-div mui-col-xs-12">
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={confirmCreate}
                    onChange={(e) => setConfirmCreate(e.target.checked)}
                  />
                )}
                label="I confirm this reviewed catalog JSON is correct and ready to create product"
              />
            </div>

            <div className="mui-grid-item-div mui-col-xs-12">
              <Button
                variant="contained"
                onClick={handleCreateProduct}
                disabled={loading || !isCreateFormValid() || !confirmCreate}
                sx={{
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 3,
                  bgcolor: '#16a34a',
                  '&:hover': { bgcolor: '#15803d' },
                }}
              >
                {loading ? 'Saving Product...' : 'Create Product From Extracted Data'}
              </Button>
            </div>
          </div>
        </div>
      )}

      <Snackbar
        open={showSuccessToast}
        autoHideDuration={1800}
        onClose={() => setShowSuccessToast(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setShowSuccessToast(false)} severity="success" variant="filled" sx={{ width: '100%' }}>
          Product created successfully.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AIAttributeExtraction;
