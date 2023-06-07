import {AiOutlineSearch} from "react-icons/ai";
import {FormEvent, useRef} from "react";

const SearchForm = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e:FormEvent) => {
    e.preventDefault()

    if(!inputRef.current) return
    const {value} =inputRef.current

    const valueReg = /^[a-zA-Z0-9]+$/
    if(!valueReg.test(value)) {
      return alert('input only accept alphabet and number')
    }


    console.log(inputRef.current.value)
  }


    return (
      <div className={'w-full'}>
          <form
            onSubmit={handleSubmit}
            className={'flex items-center  h-12 w-40 md:w-[400px] flex-1 justify-between overflow-hidden border border-[#222222] space-x-1.5 md:py-1 rounded-full'}>
              <input
                type="text"
                ref={inputRef}
                placeholder={'search video....'}
                className={'focus:outline-none w-full bg-transparent placeholder:capitalize bg-opacity-50 p-2  text-xs'}
              />
              <div className={' hidden md:flex  justify-center items-center h-12 w-12 bg-[#222222] rounded-tr-full rounded-br-full overflow-hidden '}>
                  <button
                    type={'submit'}
                    name={'search'}
                    className={' '}
                    title={'search'}>
                      <AiOutlineSearch size={25}/>
                  </button>
              </div>
          </form>
      </div>
    )
}

export default SearchForm