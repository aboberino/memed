export class JwtResponse {
    auth: boolean;
    accessToken: string;
    user: { username: string, email: string, avatar_url: string};
    authorities: string;
}
