export class Login {
  static readonly type = '[Auth] Login'
  constructor(public payload: { email: string; password: string }) {}
}

export class Register {
  static readonly type = '[Auth] Register'
  constructor(
    public payload: { email: string; password: string; powerName: string }
  ) {}
}

export class AuthFailure {
  static readonly type = '[Auth] Failure'
  constructor(public error: any) {}
}

export class Logout {
  static readonly type = '[Auth] Logout'
}
