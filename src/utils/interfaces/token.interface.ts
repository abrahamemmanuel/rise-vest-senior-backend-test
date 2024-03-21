import { User } from '@/resources/user/user.interface';

interface Token extends User {
	id: string;
	expiresIn: number;
}

export default Token;
