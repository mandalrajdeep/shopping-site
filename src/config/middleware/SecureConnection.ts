import { Request, Response, NextFunction } from 'express';

class SecureConnection {
    private HTTPS = 'otto.sedemac.io';

    public isSecure(req: Request, res: Response, next: NextFunction) {
        const host = (req.headers.host as string).split(':')[0];
        if (host.includes(this.HTTPS)) {
            if (
                req.headers['x-forwarded-proto'] &&
                req.headers['x-forwarded-proto'] === 'https'
            ) {
                next();
            } else {
                res.redirect(`https://${req.headers.host}${req.url}`);
            }
        } else {
            next();
        }
    }
}

Object.seal(SecureConnection);
export default SecureConnection;
