import React from 'react';
import styled from 'styled-components';
import { useTable, usePagination } from 'react-table';
import { Link } from 'react-router-dom';

const StyledButtons = styled.button`
  border: none;
  padding: 10px;
  border-radius: 5px;
  color: #fff;
  background: #163b60;
  cursor: pointer;
`;

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;

    thead {
        background: #163b60;
        color: #fff;
    tr {
      :last-child {
            td {
                border-bottom: 0;
                }
            }
        }

    }  
    tbody {
        tr {
            :nth-child(even) {
                background: #eaecfb;
            }
        }
    }     
    th,
    td {
		margin: 0;
		padding: 0.5rem;
		
		div {
			display: flex;
			align-items: center;
		}
		a {
			padding: 0 0 0 10px;
		}
		:last-child {
			border-right: 0;
		}
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`

const Table = ({ columns, data }) => {
  const {
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  )

  // Render the UI for your table
  return (
    <>
      	<table>
			<thead>
			{headerGroups.map(headerGroup => (
				<tr {...headerGroup.getHeaderGroupProps()}>
				{headerGroup.headers.map((column, index) => (
					<th key={index} {...column.getHeaderProps()}>{column.render('Header')}</th>
				))}
				</tr>
			))}
			</thead>
			<tbody>
				{page.map((row, i) => {
					prepareRow(row)
					return (
					<tr {...row.getRowProps()}>
						{row.cells.map(cell => <td {...cell.getCellProps()}>{cell.render('Cell')}</td>)}
					</tr>
					)
				})}
			</tbody>
		</table>

    	<div className="pagination">
			<StyledButtons onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
			{'<<'}
			</StyledButtons>{' '}
			<StyledButtons onClick={() => previousPage()} disabled={!canPreviousPage}>
			{'<'}
			</StyledButtons>{' '}
			<StyledButtons onClick={() => nextPage()} disabled={!canNextPage}>
			{'>'}
			</StyledButtons>{' '}
			<StyledButtons onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
			{'>>'}
			</StyledButtons>{' '}
			<span>Page{' '}
				<strong>
					{pageIndex + 1} of {pageOptions.length}
				</strong>{' '}
			</span>
			<span>
			| Go to page:{' '}
				<input
					type="number"
					defaultValue={pageIndex + 1}
					onChange={e => {
					const page = e.target.value ? Number(e.target.value) - 1 : 0
					gotoPage(page)
					}}
					style={{ width: '100px', padding: '5px' }}
				/>
			</span>{' '}
			<select
				style={{background: '#eaecfb', padding: '5px'}}
				value={pageSize}
				onChange={e => {
					setPageSize(Number(e.target.value))
				}}
			>
			{[10, 20, 30, 40, 50].map(pageSize => (
					<option key={pageSize} value={pageSize}>
					Show {pageSize}
					</option>
			))}
			</select>
		</div>
    </>
  )
}

function CoinMarketDetails({details}) {
  const columns = React.useMemo(
    () => [
        {
            Header: '#',
            accessor: 'market_cap_rank',
        },
        {
			Header: 'Coin',
			columns: [
				{
					Header: 'Name',
					accessor: 'name',
					Cell: (row) => {
						const {image, id, name} = row.row.original;
						return <div><img height={30} width={30} src={image} alt={id}/>
						<Link to={`details/${id}`}>{name}</Link></div>
					},
				},
				{
					Header: 'Symbol',
					accessor: 'symbol',
				},
			],
		},
		{
			Header: 'Price Info',
			columns: [
				{
					Header: 'Current Price',
					accessor: 'current_price',
					Cell: (row) => <div>€{row.row.original.current_price}</div>
				},
				{
					Header: ' High 24-hour Price',
					accessor: 'high_24h',
					Cell: (row) => <div>€{row.row.original.high_24h}</div>
				},
				{
					Header: 'Low 24-hour Price',
					accessor: 'low_24h',
					Cell: (row) => <div>€{row.row.original.low_24h}</div>
				},
			],
      	},
    ],
    []
  )

  return (
		<Styles>
			<Table columns={columns} data={details} />
		</Styles>
  	)
}

export default CoinMarketDetails;
