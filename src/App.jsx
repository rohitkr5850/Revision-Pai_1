import { useEffect , useMemo , useRef , useState } from 'react';
import axios from 'axios';
import ProductCard from './components/ProductCard';
import Pagination from './components/Pagination';
import './index.css'

export default function App() {
const [products , setProducts] = useState([]);
const [searchTerm , setsearchTerm] = useState('');
const [category , setCategory] = useState('All');
const [currentPage , setCurrentPage] = useState(1);
const debounceRef = useRef(null);

useEffect(() => {
  axios.get('https://fakestoreapi.com/products')
  .then(res => 
    setProducts(res.data))
    .catch(console.error);
},[]);




const filtered = useMemo(() => {
  return products.filter(p => {
    const matchesCategory = category === 'All' || p.category === category;
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
},[products , searchTerm , category]);




const PER_PAGE = 6;
const totalPages = 
Math.ceil(filtered.length/PER_PAGE);
const sliceStart = (currentPage - 1) * PER_PAGE;
const currentList = filtered.slice(sliceStart, sliceStart + PER_PAGE);




function handleSearch(e){
  const value = e.target.value;
  if(debounceRef.current)
    clearTimeout(debounceRef.current);
  debounceRef.current = setTimeout(() => {
    setsearchTerm(value);
    setCurrentPage(1);
  } , 400);
}

function handleCategory(e){
  setCategory(e.target.value);
  setCurrentPage(1);
}

return (
  <div className="container">
    <h1>Product Explorer</h1>

    {/* Search */}
    <input
    type='text'
    placeholder='Search by title...'
    onChange={handleSearch}
    className='search'
    />

    {/* Category Filter */}
    <select
    onChange={handleCategory}
    value={category} className='filter'>
      <option>All</option>
      <option value="electronics">electronics</option>
      <option value="men's clothing">men's clothing</option>
      <option value="womens's clothing">women's clothing</option>
    </select>

    {/* Grid */}

    <section className='grid'>
      {currentList.map(prod => (
        <ProductCard key={prod.id} product={prod}/>
      ))}
    </section>


      {/* Pagination Buttons */}


    {totalpages > 1 && (
      <Pagination
      total={totalPages}
      current={currentPage}
      setCurrent={setCurrentPage}
      />
    )}


  </div>
);

}

