export const navigation = {
  categories: [
    {
      id: 'women',
      name: 'Women',
      featured: [
        {
          name: 'New Arrivals',
          href: '/',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic Tees',
          href: '/',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', id: 'tops', href: '/women/clothing/tops' },
            { name: 'Dresses', id: 'dresses', href: '/women/clothing/dresses' },
            { name: 'Pants', id: 'pants', href: '/women/clothing/pants' },
            { name: 'Denim', id: 'women_jeans', href: '/women/clothing/women_jeans' },
            { name: 'Sweaters', id: 'sweaters', href: '/women/clothing/sweaters' },
            { name: 'T-Shirts', id: 't-shirts', href: '/women/clothing/t-shirts' },
            { name: 'Jackets', id: 'jackets', href: '/women/clothing/jackets' },
            { name: 'Activewear', id: 'activewear', href: '/women/clothing/activewear' },
            { name: 'Browse All', id: 'all', href: '/women/clothing/all' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', id: 'watches', href: '/' },
            { name: 'Wallets', id: 'wallets', href: '/' },
            { name: 'Bags', id: 'bags', href: '/' },
            { name: 'Sunglasses', id: 'sunglasses', href: '/' },
            { name: 'Hats', id: 'hats', href: '/' },
            { name: 'Belts', id: 'belts', href: '/' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Full Nelson', id: 'full_nelson', href: '/' },
            { name: 'My Way', id: 'my_way', href: '/' },
            { name: 'Re-Arranged', id: 're_arranged', href: '/' },
            { name: 'Counterfeit', id: 'counterfeit', href: '/' },
            { name: 'Significant Other', id: 'significant_other', href: '/' },
          ],
        },
      ],
    },
    {
      id: 'men',
      name: 'Men',
      featured: [
        {
          name: 'New Arrivals',
          href: '/',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
          imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
        },
        {
          name: 'Artwork Tees',
          href: '/',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
          imageAlt: 'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Mens Kurtas', id: 'mens_kurtas', href: '/men/clothing/mens_kurtas' },
            { name: 'Shirt', id: 'shirt', href: '/men/clothing/shirt' },
            { name: 'Men Jeans', id: 'men_jeans', href: '/men/clothing/men_jeans' },
            { name: 'Sweaters', id: 'sweaters', href: '/men/clothing/sweaters' },
            { name: 'T-Shirts', id: 't-shirts', href: '/men/clothing/t-shirts' },
            { name: 'Jackets', id: 'jackets', href: '/men/clothing/jackets' },
            { name: 'Activewear', id: 'activewear', href: '/men/clothing/activewear' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', id: 'watches', href: '/' },
            { name: 'Wallets', id: 'wallets', href: '/' },
            { name: 'Bags', id: 'bags', href: '/' },
            { name: 'Sunglasses', id: 'sunglasses', href: '/' },
            { name: 'Hats', id: 'hats', href: '/' },
            { name: 'Belts', id: 'belts', href: '/' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Re-Arranged', id: 're_arranged', href: '/' },
            { name: 'Counterfeit', id: 'counterfeit', href: '/' },
            { name: 'Full Nelson', id: 'full_nelson', href: '/' },
            { name: 'My Way', id: 'my_way', href: '/' },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: 'Company', id: 'company', href: '/' },
    { name: 'Stores', id: 'stores', href: '/' },
  ],
}





















// export const navigation = {
//     categories: [
//       {
//         id: 'women',
//         name: 'Women',
//         featured: [
//           {
//             name: 'New Arrivals',
//             href: '/',
//             imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
//             imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
//           },
//           {
//             name: 'Basic Tees',
//             href: '/',
//             imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
//             imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
//           },
//         ],
//         sections: [
//           {
//             id: 'clothing',
//             name: 'Clothing',
//             items: [
//               { name: 'Tops', href: '/women/clothing/tops' },
//               { name: 'Dresses', href: '/women/clothing/women_dress' },
//               { name: 'Pants', href: '/women/clothing/pants' },
//               { name: 'Denim', href: '/women/clothing/women_jeans' },
//               { name: 'Sweaters', href: '/women/clothing/sweaters' },
//               { name: 'T-Shirts', href: '/women/clothing/t-shirts' },
//               { name: 'Jackets', href: '/women/clothing/jackets' },
//               { name: 'Activewear', href: '/women/clothing/activewear' },
//               { name: 'Browse All', href: '/women/clothing/all' },
//             ],
//           },
//           {
//             id: 'accessories',
//             name: 'Accessories',
//             items: [
//               { name: 'Watches', href: '/' },
//               { name: 'Wallets', href: '/' },
//               { name: 'Bags', href: '/' },
//               { name: 'Sunglasses', href: '/' },
//               { name: 'Hats', href: '/' },
//               { name: 'Belts', href: '/' },
//             ],
//           },
//           {
//             id: 'brands',
//             name: 'Brands',
//             items: [
//               { name: 'Full Nelson', href: '/' },
//               { name: 'My Way', href: '/' },
//               { name: 'Re-Arranged', href: '/' },
//               { name: 'Counterfeit', href: '/' },
//               { name: 'Significant Other', href: '/' },
//             ],
//           },
//         ],
//       },
//       {
//         id: 'men',
//         name: 'Men',
//         featured: [
//           {
//             name: 'New Arrivals',
//             href: '/',
//             imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
//             imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
//           },
//           {
//             name: 'Artwork Tees',
//             href: '/',
//             imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
//             imageAlt:
//               'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
//           },
//         ],
//         sections: [
//           {
//             id: 'clothing',
//             name: 'Clothing',
//             items: [
//               { name: 'Mens Kurtas', id: 'mens_kurta', href: "/men/clothing/mens_kurta" },
//               { name: 'Shirt', href: '/men/clothing/shirt' },
//               { name: 'Men Jeans', href: '/men/clothing/men_jeans' },
//               { name: 'Sweaters', href: '/men/clothing/sweaters' },
//               { name: 'T-Shirts', href: '/men/clothing/t-shirts' },
//               { name: 'Jackets', href: '/men/clothing/jackets' },
//               { name: 'Activewear', href: '/men/clothing/activewear' },
//             ],
//           },
//           {
//             id: 'accessories',
//             name: 'Accessories',
//             items: [
//               { name: 'Watches', href: '/' },
//               { name: 'Wallets', href: '/' },
//               { name: 'Bags', href: '/' },
//               { name: 'Sunglasses', href: '/' },
//               { name: 'Hats', href: '/' },
//               { name: 'Belts', href: '/' },
//             ],
//           },
//           {
//             id: 'brands',
//             name: 'Brands',
//             items: [
//               { name: 'Re-Arranged', href: '/' },
//               { name: 'Counterfeit', href: '/' },
//               { name: 'Full Nelson', href: '/' },
//               { name: 'My Way', href: '/' },
//             ],
//           },
//         ],
//       },
//     ],
//     pages: [
//       { name: 'Company', href: '/' },
//       { name: 'Stores', href: '/' },
//     ],
//   }