import React from 'react';

export default function DatabaseSchema() {
  return (
    <div className="bg-terminal-bg border border-terminal-border rounded-lg p-6 font-mono text-sm">
      <div className="text-matrix mb-4">
        <i className="fas fa-database mr-2"></i>
        Database Schema
      </div>
      
      <div className="space-y-6">
        {/* Users Table */}
        <div className="border border-cyan-glow rounded p-4">
          <div className="text-cyan-glow font-bold mb-2 flex items-center">
            <i className="fas fa-users mr-2"></i>
            Users Table
          </div>
          <div className="text-xs space-y-1 ml-4">
            <div className="flex items-center">
              <span className="text-amber-glow w-24">├── id</span>
              <span className="text-muted-foreground">(PK, UUID)</span>
            </div>
            <div className="flex items-center">
              <span className="text-amber-glow w-24">├── email</span>
              <span className="text-muted-foreground">(UNIQUE)</span>
            </div>
            <div className="flex items-center">
              <span className="text-amber-glow w-24">├── password_hash</span>
            </div>
            <div className="flex items-center">
              <span className="text-amber-glow w-24">├── created_at</span>
            </div>
            <div className="flex items-center">
              <span className="text-amber-glow w-24">└── updated_at</span>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="border border-green-400 rounded p-4">
          <div className="text-green-400 font-bold mb-2 flex items-center">
            <i className="fas fa-box mr-2"></i>
            Products Table
          </div>
          <div className="text-xs space-y-1 ml-4">
            <div className="flex items-center">
              <span className="text-amber-glow w-24">├── id</span>
              <span className="text-muted-foreground">(PK, UUID)</span>
            </div>
            <div className="flex items-center">
              <span className="text-amber-glow w-24">├── name</span>
              <span className="text-muted-foreground">(INDEXED)</span>
            </div>
            <div className="flex items-center">
              <span className="text-amber-glow w-24">├── price</span>
              <span className="text-muted-foreground">(DECIMAL)</span>
            </div>
            <div className="flex items-center">
              <span className="text-amber-glow w-24">├── category_id</span>
              <span className="text-muted-foreground">(FK)</span>
            </div>
            <div className="flex items-center">
              <span className="text-amber-glow w-24">└── inventory_count</span>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="border border-red-glow rounded p-4">
          <div className="text-red-glow font-bold mb-2 flex items-center">
            <i className="fas fa-shopping-cart mr-2"></i>
            Orders Table
          </div>
          <div className="text-xs space-y-1 ml-4">
            <div className="flex items-center">
              <span className="text-amber-glow w-24">├── id</span>
              <span className="text-muted-foreground">(PK, UUID)</span>
            </div>
            <div className="flex items-center">
              <span className="text-amber-glow w-24">├── user_id</span>
              <span className="text-muted-foreground">(FK)</span>
            </div>
            <div className="flex items-center">
              <span className="text-amber-glow w-24">├── total_amount</span>
            </div>
            <div className="flex items-center">
              <span className="text-amber-glow w-24">├── status</span>
              <span className="text-muted-foreground">(ENUM)</span>
            </div>
            <div className="flex items-center">
              <span className="text-amber-glow w-24">└── order_items</span>
              <span className="text-muted-foreground">(1:M)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Relationships */}
      <div className="mt-6 pt-4 border-t border-terminal-border">
        <div className="text-matrix font-bold mb-3 flex items-center">
          <i className="fas fa-project-diagram mr-2"></i>
          Relationships
        </div>
        <div className="text-xs space-y-2 ml-4">
          <div className="flex items-center">
            <span className="text-cyan-glow">Users</span>
            <span className="text-muted-foreground mx-2">1:N</span>
            <span className="text-red-glow">Orders</span>
          </div>
          <div className="flex items-center">
            <span className="text-green-400">Products</span>
            <span className="text-muted-foreground mx-2">1:N</span>
            <span className="text-red-glow">Order Items</span>
          </div>
          <div className="flex items-center">
            <span className="text-red-glow">Orders</span>
            <span className="text-muted-foreground mx-2">1:N</span>
            <span className="text-red-glow">Order Items</span>
          </div>
        </div>
      </div>
    </div>
  );
} 