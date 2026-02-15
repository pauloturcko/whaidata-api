import jwt from 'jsonwebtoken'

export function generateToken (userId: number | undefined): string {
    return jwt.sign({
        userId
    },
        process.env.JWT_SECRET || 'secret',
        {expiresIn: '1h'}
    )
}

export function verifyToken (token: string): any {
    return jwt.verify(token, process.env.JWT_SECRET || 'secret')
}