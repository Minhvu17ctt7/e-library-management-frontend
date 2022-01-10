import moment from 'moment';

export const convertTime = (time) => {
	return moment(time).format('YYYY/MM/DD');
};
