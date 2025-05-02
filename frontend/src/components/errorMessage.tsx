type ErrorMessageProps = {
    children : React.ReactNode
}

export default function ErrorMessage ({children } : ErrorMessageProps) {
    return (
        <p className="bg-red-50 text-red-600 text-center p-3 uppercase text-sm font-bold ">{children}</p>
    )
}