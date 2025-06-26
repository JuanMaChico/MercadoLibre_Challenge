import React from 'react';
import '../../styles/components/_welcome-message.scss';

const WelcomeMessage = ({ onClose }) => (
	<div className='welcome-message'>
		<div className='welcome-message__arrow' />
		<div className='welcome-message__content'>
			<div className='welcome-message__header'>
				<span>Hola</span>
				<button className='welcome-message__close' onClick={onClose}>
					×
				</button>
			</div>
			<p>
				Para realizar búsquedas, solo debes ingresar el nombre de lo que necesites.
				Pueden ser productos, marcas y más...
			</p>
		</div>
	</div>
);

export default WelcomeMessage;
