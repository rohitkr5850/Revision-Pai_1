export default function
Productcard({ product }){
    return (
        <article className="card">
            <img src={product.image} alt={product.title}/>
            <h3>{product.title}</h3>
            <p className="price">${product.price}</p>
            <small>{product.category}
            </small>
        </article>
    );
}