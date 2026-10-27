<img width="1847" height="1010" alt="Screenshot 2026-10-27 at 3 52 38 PM" src="https://github.com/user-attachments/assets/6cf3e71a-0dc2-49e2-8349-aca0d5bb6b3b" /># Stria — Football shirts

A catalog shop for football shirts, built with Next.js, TypeScript, Tailwind CSS, and Stripe.

## Features

- **Modern UI/UX**: Clean, responsive design with TailwindCSS
- **Product Catalog**: Browse jerseys by category, brand, size, and price
- **Product Details**: Image gallery, size selection, and detailed product information
- **Shopping Cart**: Add, remove, and update quantities with persistent storage
- **Secure Checkout**: Stripe integration for secure payment processing
- **Responsive Design**: Mobile-first approach with desktop optimization
- **TypeScript**: Full type safety throughout the application
- **Performance**: Optimized with Next.js 14 App Router
- **Robust Scraping**: Enhanced Yupoo scraper with proper image downloading
- **Cloudinary Integration**: Optional cloud image hosting for better performance
- **Intelligent Enrichment**: Automatic product categorization and pricing

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **Payment**: Stripe
- **State Management**: React Context API
- **Utilities**: clsx, tailwind-merge
- **Scraping**: Playwright, gallery-dl (Python fallback)
- **Image Hosting**: Cloudinary (optional)
- **Browser Automation**: Playwright

## Screenshots

<img width="1847" height="1010" alt="Screenshot 2026-10-27 at 3 51 21 PM" src="https://github.com/user-attachments/assets/3736d86a-85c3-4c42-b792-d65832e6a1f4" />
<img width="1847" height="1010" alt="Screenshot 2026-10-27 at 3 52 00 PM" src="https://github.com/user-attachments/assets/33db3273-3e69-49e9-9233-9bc1c347b735" />
<img width="1847" height="1010" alt="Screenshot 2026-10-27 at 3 52 19 PM" src="https://github.com/user-attachments/assets/3e9befb6-b77a-4f26-80b6-e0d17a0effae" />
<img width="1847" height="1010" alt="Screenshot 2026-10-27 at 3 52 38 PM" src="https://github.com/user-attachments/assets/ef7c8cd3-3dee-4a44-a5b9-a16fc02be86c" />
<img width="1847" height="1010" alt="Screenshot 2026-10-27 at 3 52 44 PM" src="https://github.com/user-attachments/assets/8cea4fec-68fd-4eb5-bd53-dff1dd7fb9b8" />

##  Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Stripe account (for payments)
- Optional: Cloudinary account (for image hosting)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd stria
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)


## Pages & Features

### Home Page (`/`)
- Hero section with call-to-action
- Featured products grid
- Category navigation
- Trust indicators

### Products Page (`/products`)
- Product grid with filters
- Search functionality
- Category, brand, size, and price filters
- Grid/list view toggle

### Product Detail (`/products/[id]`)
- Image gallery with thumbnails
- Size selection
- Quantity picker
- Add to cart functionality
- Product information and reviews

### Shopping Cart (`/cart`)
- Cart item list
- Quantity adjustment
- Remove items
- Order summary
- Proceed to checkout

### Checkout (`/checkout`)
- Customer information form
- Shipping address
- Order summary
- Stripe payment integration

### Success Page (`/checkout/success`)
- Order confirmation
- Next steps information
- Continue shopping links

##  Styling

The project uses TailwindCSS for styling with a custom design system:

- **Colors**: Paper `#FBF8F3`, pine ink `#14261C`, cinnabar `#C4371F`
- **Typography**: Inter font family
- **Components**: Card-based layout with shadows and rounded corners
- **Responsive**: Mobile-first with breakpoints for tablet and desktop

##  Security

- Stripe handles all payment processing
- No sensitive data stored locally
- Environment variables for API keys
- Input validation on forms


##  License

This project is licensed under the MIT License.

