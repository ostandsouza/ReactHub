import React, { FC } from 'react'

const Pagination: FC<any> = ({postPerPage, totalPosts, paginate}) => {
    const pageNumber:number[]=[]
    console.log("TotalPosts",postPerPage)
    console.log("PostPerPage",totalPosts)
    for(let i=1; i<=Math.ceil(totalPosts/postPerPage); i++){
        pageNumber.push(i)
    }
    return (
        <nav>
            <ul className="pagination">
                {console.log("pageNumber:",pageNumber)}
                {pageNumber.map(number=>(
                    <li key={number} className='page-item'>
                        <a onClick={()=> paginate(number)} href="!#" className='page-link' style={{marginLeft:'20px'}}>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
            
        </nav>
    )
}

export default Pagination
