import Link from "next/link"
export const Login = () => (
    <div className="flex space-x-4">
              <button className="btn signin">
                <Link href="/signin" className="px-4 py-2">
                  Zaloguj się
                </Link>
              </button>
              <button className="btn signup">
                <Link href="/signup" className="px-4 py-2">
                  Załóż konto
                </Link>
              </button>
            </div>
)