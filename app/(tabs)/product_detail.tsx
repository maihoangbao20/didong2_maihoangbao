import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const ProductDetail = () => {
  // Dữ liệu sản phẩm giả lập
  const product = {
    name: 'Tên sản phẩm',
    originalPrice: '700.000 VNĐ',
    salePrice: '500.000 VNĐ',
    description: 'Mô tả chi tiết về sản phẩm.',
    image: './../../assets/images/3.jpg',
    sizeOptions: ['S', 'M', 'L', 'XL'],
    rating: 4.5,
    reviews: [
      { user: 'Nguyễn Văn A', comment: 'Sản phẩm chất lượng tốt!', rating: 5 },
      { user: 'Trần Thị B', comment: 'Thích sản phẩm này.', rating: 4 },
    ],
    stock: 10,
  };

  // Dữ liệu sản phẩm khác giả lập
  const otherProducts = [
    {
      id: 1,
      name: 'Sản phẩm 1',
      price: '450.000 VNĐ',
      image: './../../assets/images/3.jpg',
    },
    {
      id: 2,
      name: 'Sản phẩm 2',
      price: '350.000 VNĐ',
      image: './../../assets/images/2.jpg',
    },
    {
      id: 3,
      name: 'Sản phẩm 3',
      price: '600.000 VNĐ',
      image: './../../assets/images/3.jpg',
    },
    {
      id: 4,
      name: 'Sản phẩm 4',
      price: '400.000 VNĐ',
      image: './../../assets/images/2.jpg',
    },
    {
      id: 5,
      name: 'Sản phẩm 5',
      price: '300.000 VNĐ',
      image: './../../assets/images/3.jpg',
    },
    {
      id: 6,
      name: 'Sản phẩm 6',
      price: '550.000 VNĐ',
      image: './../../assets/images/2.jpg',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.productImage} />

      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>
          Giá: <Text style={styles.salePrice}>{product.salePrice}</Text> <Text style={styles.originalPrice}>{product.originalPrice}</Text>
        </Text>
        <Text style={styles.productStock}>Còn lại: {product.stock} sản phẩm</Text>
        <Text style={styles.productRating}>Đánh giá: {product.rating} ⭐</Text>

        <Text style={styles.sizeLabel}>Chọn kích thước:</Text>
        <View style={styles.sizeContainer}>
          {product.sizeOptions.map((size) => (
            <TouchableOpacity key={size} style={styles.sizeButton}>
              <Text style={styles.sizeText}>{size}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.productDescription}>{product.description}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buyNowButton}>
          <Text style={styles.buttonText}>Mua ngay</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.buttonText}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.reviewsContainer}>
        <Text style={styles.reviewsTitle}>Đánh giá từ khách hàng:</Text>
        {product.reviews.map((review, index) => (
          <View key={index} style={styles.reviewItem}>
            <Text style={styles.reviewUser}>{review.user}:</Text>
            <Text style={styles.reviewComment}> {review.comment}</Text>
            <Text style={styles.reviewRating}> {review.rating} ⭐</Text>
          </View>
        ))}
      </View>

      {/* Sản phẩm khác */}
      <View style={styles.otherProductsContainer}>
        <Text style={styles.otherProductsTitle}>Sản phẩm khác:</Text>
        <View style={styles.otherProductsList}>
          {otherProducts.map((otherProduct) => (
            <TouchableOpacity key={otherProduct.id} style={styles.otherProductCard}>
              <Image source={{ uri: otherProduct.image }} style={styles.otherProductImage} />
              <Text style={styles.otherProductName}>{otherProduct.name}</Text>
              <Text style={styles.otherProductPrice}>{otherProduct.price}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  productImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 16,
  },
  detailsContainer: {
    marginBottom: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 20,
    color: 'green',
    marginBottom: 8,
  },
  salePrice: {
    fontWeight: 'bold',
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    color: 'red',
    marginLeft: 8,
  },
  productStock: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  productRating: {
    fontSize: 16,
    color: '#FFA500',
    marginBottom: 8,
  },
  sizeLabel: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  sizeContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  sizeButton: {
    backgroundColor: '#e0e0e0',
    padding: 8,
    borderRadius: 5,
    marginRight: 8,
  },
  sizeText: {
    fontSize: 16,
  },
  productDescription: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: '#ff9900',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 8,
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewsContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  reviewsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  reviewItem: {
    marginBottom: 10,
  },
  reviewUser: {
    fontWeight: 'bold',
  },
  reviewComment: {
    fontSize: 16,
    color: '#333',
  },
  reviewRating: {
    color: '#FFA500',
  },
  otherProductsContainer: {
    marginTop: 20,
  },
  otherProductsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  otherProductsList: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Cho phép bọc
    justifyContent: 'space-between', // Để căn giữa
  },
  otherProductCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: '48%', // Chiếm 48% chiều rộng để có 2 sản phẩm mỗi hàng
  },
  otherProductImage: {
    width: '100%',
    height: 100,
    borderRadius: 5,
    marginBottom: 8,
  },
  otherProductName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  otherProductPrice: {
    fontSize: 14,
    color: 'green',
  },
});

export default ProductDetail;
