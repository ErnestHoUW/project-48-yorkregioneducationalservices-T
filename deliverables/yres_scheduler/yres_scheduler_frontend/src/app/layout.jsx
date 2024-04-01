import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';


export const metadata = {
  title: 'YRES Scheduler',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body><div className='noverflow'>{children}</div></body>
    </html>
  )
}