import ReactPaginate from "react-paginate";
import css from './Paginate.module.css'


interface PaginateProps {
  total: number;
  page: number;
  onChange: (nextPage: number)=> void;
}

export default function Paginate( {page, total, onChange}:PaginateProps ){
    return (
        <ReactPaginate
          pageCount={total}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => onChange(selected + 1)}
          forcePage={page - 1}
          renderOnZeroPageCount={null}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
    )
}
