import CreditCardDetail from '../creditCardDetail';
import creditCardsData from './creditCardData';

const cardMaster = creditCardsData.find((card) => card.id === 'cardMaster');

export default () => <CreditCardDetail card={cardMaster} />;
