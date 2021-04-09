import React, { useState, useEffect } from 'react'
import movies from "../movies";

const Pagination = ({ pages = movies.length/3, setCurrentPage }) => {

  const numberOfPages = []
  for (let i = 1; i <= pages; i++) {
    numberOfPages.push(i)
  }


  const [currentButton, setCurrentButton] = useState(1)


  const [arrOfCurrButtons, setArrOfCurrButtons] = useState([])

  useEffect(() => {
    let tempNumberOfPages = [...arrOfCurrButtons]

    let dotsInitial = '...'
    let dotsLeft = '... '
    let dotsRight = ' ...'

    if (numberOfPages.length < 6) {
      tempNumberOfPages = numberOfPages
    }

    else if (currentButton >= 1 && currentButton <= 3) {
      tempNumberOfPages = [1, 2, 3, 4, dotsInitial, numberOfPages.length]
    }

    else if (currentButton === 4) {
      const sliced = numberOfPages.slice(0, 5)
      tempNumberOfPages = [...sliced, dotsInitial, numberOfPages.length]
    }

    else if (currentButton > 4 && currentButton < numberOfPages.length - 2) {               // from 5 to 8 -> (10 - 2)
      const sliced1 = numberOfPages.slice(currentButton - 2, currentButton)                 // sliced1 (5-2, 5) -> [4,5] 
      const sliced2 = numberOfPages.slice(currentButton, currentButton + 1)                 // sliced1 (5, 5+1) -> [6]
      tempNumberOfPages = ([1, dotsLeft, ...sliced1, ...sliced2, dotsRight, numberOfPages.length]) // [1, '...', 4, 5, 6, '...', 10]
    }
    
    else if (currentButton > numberOfPages.length - 3) {                 
      const sliced = numberOfPages.slice(numberOfPages.length - 4)       
      tempNumberOfPages = ([1, dotsLeft, ...sliced])                        
    }
    
    else if (currentButton === dotsInitial) {
      setCurrentButton(arrOfCurrButtons[arrOfCurrButtons.length-3] + 1) 
    }
    else if (currentButton === dotsRight) {
      setCurrentButton(arrOfCurrButtons[3] + 2)
    }

    else if (currentButton === dotsLeft) {
      setCurrentButton(arrOfCurrButtons[3] - 2)
    }

    setArrOfCurrButtons(tempNumberOfPages)
    setCurrentPage(currentButton)
  }, [currentButton])


  return (
    <div className="pagination-container">
      <a
        className={`${currentButton === 1 ? 'disabled' : ''}`}
        onClick={() => setCurrentButton(prev => prev <= 1 ? prev : prev - 1)}
      >
        Prev
      </a>

      {arrOfCurrButtons.map(((item, index) => {
        return <a
          
          key={index}
          className={`${currentButton === item ? 'active' : ''}`}
          onClick={() => setCurrentButton(item)}
        >
          {item}
        </a>
      }))}

      <a
       
        className={`${currentButton === numberOfPages.length ? 'disabled' : ''}`}
        onClick={() => setCurrentButton(prev => prev >= numberOfPages.length ? prev : prev + 1)}
      >
        Next
      </a>
    </div>
  );
}

export default Pagination;
