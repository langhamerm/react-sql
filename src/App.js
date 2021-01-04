import React, { Component } from "react";

import axios from "axios";

export class App extends Component {
	state = {
		products: [],
		product: {
			name: "",
			price: 0,
		},
	};

	componentDidMount() {
		this.getProducts();
	}

	getProducts = () => {
		fetch("http://localhost:4000/products")
			.then((response) => response.json())
			.then((response) => {
				this.setState({
					products: response.data,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	addProduct = () => {
		const { product } = this.state;
		fetch(
			`http://localhost:4000/products/add?name=${product.name}&price=${product.price}`
		)
			.then(this.getProducts)
			.catch((err) => {
				console.log(err);
			});
	};

	deleteProduct = () => {
		const { product } = this.state;
		axios
			.delete(`http://localhost:4000/products/${product.name}`)
			.then(this.getProducts)
			.catch((err) => {
				console.log(err);
			});
  };
  
   updateProduct = (newPrice) => {
    const { product } = this.state;
    axios.post(`http://localhost:4000/products/${product.name}/${newPrice}`)
    .then(this.getProducts)
    .catch((err) => {
      console.log(err);
    });
  }


	renderProduct = ({ product_id, name, price }) => <div key={product_id}>{name} | {price}</div>;
	render() {
		const { products, product } = this.state;
		return (
			<div>
				<div>{products.map(this.renderProduct)}</div>
				<div>
					<input
						onChange={(e) => {
							this.setState({
								product: { ...product, name: e.target.value },
							});
						}}
						value={product.name}
						type="text"
					/>
					<input
						onChange={(e) => {
							this.setState({
								product: { ...product, price: e.target.value },
							});
						}}
						value={product.price}
						type="number"
					/>
				</div>
				<button onClick={this.addProduct}>Add</button>

				<form onSubmit={this.deleteProduct}>
					<input
						onChange={(e) => {
							this.setState({
								product: { ...product, name: e.target.value },
							});
						}}
						type="text"
						value={product.name}
					/>
					<button type="submit">Delete</button>
				</form>
        
				<form onSubmit={this.updateProduct(product.price)}>
					<input
						onChange={(e) => {
							this.setState({
								product: { ...product, name: e.target.value },
							});
						}}
						type="text"
						value={product.name}
					/>
          					<input
						onChange={(e) => {
							this.setState({
								product: { ...product, price: e.target.value },
							});
						}}
						value={product.price}
						type="number"
					/>
					<button type="submit">Update Price</button>
				</form>
			</div>
		);
	}
}

export default App;
