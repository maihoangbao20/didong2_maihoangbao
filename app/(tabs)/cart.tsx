import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Image } from 'react-native';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const initialCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Sản phẩm A',
    price: 100000,
    quantity: 1,
    image: './../../assets/images/1.png', // Thay thế bằng URL hình ảnh thực tế
  },
  {
    id: '2',
    name: 'Sản phẩm B',
    price: 200000,
    quantity: 1,
    image: './../../assets/images/1.png',
  },
  {
    id: '3',
    name: 'Sản phẩm C',
    price: 150000,
    quantity: 1,
    image: './../../assets/images/1.png',
  },
];

const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' đ';
};

const CartScreen = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  // Thêm kiểu cho các tham số
  const updateQuantity = (id: string, delta: number): void => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giỏ hàng của bạn</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>{formatPrice(item.price)} x {item.quantity}</Text>
              <View style={styles.quantityContainer}>
                <Button title="-" onPress={() => updateQuantity(item.id, -1)} />
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <Button title="+" onPress={() => updateQuantity(item.id, 1)} />
              </View>
            </View>
          </View>
        )}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Tổng: {formatPrice(total)}</Text>
        <Button title="Thanh toán" onPress={() => alert('Đi đến thanh toán')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  itemImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
  },
  itemPrice: {
    fontSize: 18,
    color: 'green',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 18,
  },
  totalContainer: {
    marginTop: 20,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default CartScreen;
