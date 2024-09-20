
import clsx from 'clsx';


interface Props {
  selectedSize?: any;
  availableSizes: any; 

  onSizeChanged: ( size: string ) => void;
}



export const SizeSelector = ({ selectedSize, availableSizes, onSizeChanged }: Props) => {


  return (
    <div className="my-5">
      <h3 className="font-bold mb-4">Tallas disponibles</h3>

      <div className="flex">

        {
          availableSizes.map( (size: any) => (
            <button 
              key={ size.size._id }
              onClick={ () => onSizeChanged(size.size?.name) }
              className={
                clsx(
                  "mx-2 hover:underline text-lg min-w-[25px] text-center",
                  {
                    'hover:underline underline': size.size.name === selectedSize,
                    'bg-gray-300 text-gray-500 cursor-not-allowed': size.quantity == 0, 
                    'bg-blue-500 text-white': size.quantity !== 0    
                  }
                )
              }
              disabled={size.quantity == 0}
            >
              { size.size.name}
            </button>
          ))

        }
      </div>
    </div>
  )
}