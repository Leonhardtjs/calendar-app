import {addHours} from 'date-fns';
import {useState} from 'react';
import ReactModal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const customStyles = {
   content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
   },
   overlay: {
      zIndex: 4,
   },
};

ReactModal.setAppElement('#root');

export const CalendarModal = () => {
   const [isOpen, setIsOpen] = useState(true);

   const [formValues, setFormValues] = useState({
      title: 'Fernando',
      notes: 'Herrera',
      start: new Date(),
      end: addHours(new Date(), 2),
   });

   const onInputChange = ({target}) => {
      setFormValues({
         ...formValues,
         [target.name]: target.value,
      });
   };

   const onDateChange = (event, changing) => {
      setFormValues({
         ...formValues,
         [changing]: event,
      });
   };

   const onCloseModal = () => {
      console.log('Cerrando Modal');
      setIsOpen(false);
   };

   return (
      <ReactModal
         closeTimeoutMS={200}
         overlayClassName='modal-fondo'
         className='modal'
         isOpen={isOpen}
         onRequestClose={onCloseModal}
         style={customStyles}
      >
         <h1> Nuevo evento </h1>
         <hr />
         <form className='container'>
            <div className='form-group mb-2'>
               <label>Fecha y hora inicio</label>
               <DatePicker
                  selected={formValues.start}
                  className='form-control'
                  onChange={event => onDateChange(event, 'start')}
                  dateFormat='Pp'
               />
            </div>

            <div className='form-group mb-2'>
               <label>Fecha y hora fin</label>
               <DatePicker
                  minDate={formValues.start}
                  selected={formValues.end}
                  className='form-control'
                  onChange={event => onDateChange(event, 'end')}
                  dateFormat='Pp'
               />
            </div>

            <hr />
            <div className='form-group mb-2'>
               <label>Titulo y notas</label>
               <input
                  type='text'
                  className='form-control'
                  placeholder='Título del evento'
                  name='title'
                  autoComplete='off'
                  value={formValues.title}
                  onChange={onInputChange}
               />
               <small id='emailHelp' className='form-text text-muted'>
                  Una descripción corta
               </small>
            </div>

            <div className='form-group mb-2'>
               <textarea
                  type='text'
                  className='form-control'
                  placeholder='Notas'
                  rows='5'
                  name='notes'
                  value={formValues.notes}
                  onChange={onInputChange}
               ></textarea>
               <small id='emailHelp' className='form-text text-muted'>
                  Información adicional
               </small>
            </div>

            <button type='submit' className='btn btn-outline-primary btn-block'>
               <i className='far fa-save'></i>
               <span> Guardar</span>
            </button>
         </form>
      </ReactModal>
   );
};