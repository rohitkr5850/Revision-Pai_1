export default function
Pagination({total , current , setCurrent}) {

const numbers = Array.from({length: total}, (_, i) => i + 1);

return (
<div className="pagination">
    <button
    onClick={() => setCurrent(c => Math.max(c - 1 , 1))}
    disabled={current === 1}
    >
        Previous
    </button>
    {numbers.map(n => (
        <button
        key={n}
        onClick={() => setCurrent(n)}
        className={n === current ? 'active' : ''}
        >{n}
        </button>
    ))}

    <button
    onClick={() => setCurrent(c => Math.min(c + 1, total))}
    disabled={current === total}>
        Next
    </button>
</div>
);
}