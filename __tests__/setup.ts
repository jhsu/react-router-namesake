import { configure } from 'enzyme';
import * as Adapter from './ReactSixteenAdapter';

configure({ adapter: new Adapter() });
