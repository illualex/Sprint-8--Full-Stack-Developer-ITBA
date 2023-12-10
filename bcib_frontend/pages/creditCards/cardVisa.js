import CreditCardDetail from '../creditCardDetail';
import creditCardsData from './creditCardData'; 

const cardVisa = creditCardsData.find((card) => card.id === 'cardVisa');

export default () => <CreditCardDetail card={cardVisa} />;
