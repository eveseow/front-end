export class Session {

    constructor (public session_id: number, public session_key: number, public session_name: string, public session_description: string, public question: string, public session_category: string, public createdAt: Date,public session_status: boolean) {
    }
}