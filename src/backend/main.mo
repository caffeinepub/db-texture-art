import Map "mo:core/Map";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  module Category {
    public let compare = Text.compare;
  };

  type ProductId = Nat;

  type Variant = {
    size : ?Text;
    color : ?Text;
  };

  type Category = Text;

  type ProductInput = {
    name : Text;
    description : Text;
    price : Nat;
    category : Category;
    imageUrl : Text;
    stock : Nat;
    variants : [Variant];
    featured : Bool;
  };

  type Product = {
    id : ProductId;
    name : Text;
    description : Text;
    price : Nat;
    category : Category;
    imageUrl : Text;
    stock : Nat;
    variants : [Variant];
    featured : Bool;
  };

  type OrderStatus = { #pending; #shipped; #delivered; #cancelled };

  type OrderItem = {
    productId : ProductId;
    variant : Variant;
    quantity : Nat;
    unitPrice : Nat;
  };

  type Order = {
    orderId : Nat;
    items : [OrderItem];
    total : Nat;
    status : OrderStatus;
    shippingAddress : Text;
    userId : Principal;
  };

  let products = Map.empty<ProductId, Product>();

  let carts = Map.empty<Principal, [(ProductId, Variant, Nat)]>();

  let orders = Map.empty<Nat, Order>();

  let ordersByUser = Map.empty<Principal, [Nat]>();

  var nextProductId = 0;
  var nextOrderId = 0;

  let categories : [Category] = ["Electronics", "Fashion", "Home & Living", "Beauty", "Sale"];

  // Admin functions
  public shared ({ caller }) func addProduct(product : ProductInput) : async ProductId {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Only admins can add products");
    };
    let productId = nextProductId;
    nextProductId += 1;
    let newProduct : Product = {
      id = productId;
      name = product.name;
      description = product.description;
      price = product.price;
      category = product.category;
      imageUrl = product.imageUrl;
      stock = product.stock;
      variants = product.variants;
      featured = product.featured;
    };
    products.add(productId, newProduct);
    productId;
  };

  public shared ({ caller }) func updateProduct(productId : ProductId, updatedProduct : ProductInput) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Only admins can update products");
    };
    switch (products.get(productId)) {
      case (null) { Runtime.trap("Product not found") };
      case (?_) {
        let newProduct : Product = {
          id = productId;
          name = updatedProduct.name;
          description = updatedProduct.description;
          price = updatedProduct.price;
          category = updatedProduct.category;
          imageUrl = updatedProduct.imageUrl;
          stock = updatedProduct.stock;
          variants = updatedProduct.variants;
          featured = updatedProduct.featured;
        };
        products.add(productId, newProduct);
      };
    };
  };

  public shared ({ caller }) func deleteProduct(productId : ProductId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Only admins can delete products");
    };
    if (not products.containsKey(productId)) {
      Runtime.trap("Product not found");
    };
    products.remove(productId);
  };

  // Cart functions
  public shared ({ caller }) func addToCart(productId : ProductId, variant : Variant, quantity : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add items to cart");
    };
    if (quantity <= 0) { Runtime.trap("Quantity must be greater than 0") };
    switch (products.get(productId)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) {
        if (product.stock < quantity) {
          Runtime.trap("Not enough stock available");
        };
        let currentCart = switch (carts.get(caller)) {
          case (null) { [] };
          case (?cart) { cart };
        };
        let existingItem = currentCart.find(func((id, v, _)) { id == productId and v.size == variant.size and v.color == variant.color });
        let newCart = switch (existingItem) {
          case (null) { currentCart.concat([(productId, variant, quantity)]) };
          case (?_) {
            currentCart.map(func((id, v, q)) { if (id == productId and v.size == variant.size and v.color == variant.color) { (id, v, q + quantity) } else { (id, v, q) } });
          };
        };
        carts.add(caller, newCart);
      };
    };
  };

  public shared ({ caller }) func updateCartItem(productId : ProductId, variant : Variant, quantity : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update cart items");
    };
    if (quantity <= 0) { Runtime.trap("Quantity must be greater than 0") };
    switch (carts.get(caller)) {
      case (null) { Runtime.trap("Cart not found") };
      case (?cart) {
        let existingItem = cart.find(func((id, v, _)) { id == productId and v.size == variant.size and v.color == variant.color });
        switch (existingItem) {
          case (null) { Runtime.trap("Item not found in cart") };
          case (?_) {
            let newCart = cart.map(func((id, v, q)) { if (id == productId and v.size == variant.size and v.color == variant.color) { (id, v, quantity) } else { (id, v, q) } });
            carts.add(caller, newCart);
          };
        };
      };
    };
  };

  public shared ({ caller }) func removeFromCart(productId : ProductId, variant : Variant) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can remove items from cart");
    };
    switch (carts.get(caller)) {
      case (null) { Runtime.trap("Cart not found") };
      case (?cart) {
        let newCart = cart.filter(func((id, v, _)) { not (id == productId and v.size == variant.size and v.color == variant.color) });
        carts.add(caller, newCart);
      };
    };
  };

  public query ({ caller }) func getCart() : async [(ProductId, Variant, Nat)] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their cart");
    };
    switch (carts.get(caller)) {
      case (null) { [] };
      case (?cart) { cart };
    };
  };

  public shared ({ caller }) func clearCart() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can clear their cart");
    };
    carts.remove(caller);
  };

  // Order functions
  public shared ({ caller }) func placeOrder(shippingAddress : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can place orders");
    };
    let cart = switch (carts.get(caller)) {
      case (null) { [] };
      case (?items) { items };
    };

    if (cart.size() == 0) { Runtime.trap("Cart is empty") };

    let orderItems = cart.map(
      func((productId, variant, quantity)) {
        switch (products.get(productId)) {
          case (null) { Runtime.trap("Product not found") };
          case (?product) {
            {
              productId;
              variant;
              quantity;
              unitPrice = product.price;
            };
          };
        };
      }
    );

    let total = orderItems.foldLeft(
      0,
      func(acc, item) { acc + (item.quantity * item.unitPrice) },
    );

    let orderId = nextOrderId;
    nextOrderId += 1;

    let newOrder : Order = {
      orderId;
      items = orderItems;
      total;
      status = #pending;
      shippingAddress;
      userId = caller;
    };

    orders.add(orderId, newOrder);

    let userOrders = switch (ordersByUser.get(caller)) {
      case (null) { [orderId] };
      case (?existing) { existing.concat([orderId]) };
    };
    ordersByUser.add(caller, userOrders);

    for ((productId, _, quantity) in cart.values()) {
      switch (products.get(productId)) {
        case (null) {};
        case (?product) {
          let updatedProduct = {
            product with stock = if (product.stock > quantity) { product.stock - quantity } else { 0 };
          };
          products.add(productId, updatedProduct);
        };
      };
    };

    carts.remove(caller);
    orderId;
  };

  public query ({ caller }) func getOrder(orderId : Nat) : async Order {
    switch (orders.get(orderId)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) {
        if (caller != order.userId and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized");
        };
        order;
      };
    };
  };

  public query ({ caller }) func getMyOrders() : async [Order] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their orders");
    };
    let orderIds = switch (ordersByUser.get(caller)) {
      case (null) { [] };
      case (?ids) { ids };
    };
    orderIds.map(func(id) { switch (orders.get(id)) { case (null) { Runtime.trap("Order not found") }; case (?order) { order } } });
  };

  // Product search/filter
  public query ({ caller }) func getProductsByCategory(category : Category) : async [Product] {
    products.values().toArray().filter(func(product) { product.category == category });
  };

  public query ({ caller }) func searchProducts(searchTerm : Text) : async [Product] {
    products.values().toArray().filter(func(product) {
      product.name.toLower().contains(#text(searchTerm.toLower())) or product.description.toLower().contains(#text(searchTerm.toLower()));
    });
  };

  public query ({ caller }) func getFeaturedProducts() : async [Product] {
    products.values().toArray().filter(func(product) { product.featured });
  };

  public query ({ caller }) func getCategories() : async [Category] {
    categories;
  };
};
