import { useState } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';
import { Header } from '@/components/Header';
import { SearchAndSort } from '@/components/SearchAndSort';
import { ProductGrid } from '@/components/ProductGrid';
import { Cart } from '@/components/Cart';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

export const Products = () => {
  const [showCart, setShowCart] = useState(false);
  const {
    products,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    sortOption,
    setSortOption,
  } = useProducts();

  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
  } = useCart();

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header cartItemsCount={getTotalItems()} onCartClick={() => setShowCart(true)} />
        <div className="container mx-auto px-4 py-8">
          <Alert variant="destructive" className="max-w-md mx-auto">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Failed to load products. Please check your internet connection and try again.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={getTotalItems()} onCartClick={() => setShowCart(!showCart)} />
      
      <main className="container mx-auto px-4 py-8">
        {showCart ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">Your Cart</h2>
              <button
                onClick={() => setShowCart(false)}
                className="text-primary hover:text-primary/80 font-medium"
              >
                ← Back to Products
              </button>
            </div>
            <Cart
              items={cartItems}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeFromCart}
              onClearCart={clearCart}
              totalPrice={getTotalPrice()}
            />
          </div>
        ) : (
          <div>
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Product Gallery
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover amazing products from our curated collection. Find exactly what you're looking for with our advanced search and filtering options.
              </p>
            </div>

            <SearchAndSort
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              sortOption={sortOption}
              onSortChange={setSortOption}
              productCount={products.length}
            />

            <ProductGrid
              products={products}
              onAddToCart={addToCart}
              loading={loading}
            />
          </div>
        )}
      </main>
    </div>
  );
};