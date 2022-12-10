import "./globals.css";

import { NavigationPane } from "../components/NavigationPane";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode | undefined;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <div className="page-container">
          <div
            id="content"
            className="relative flex w-full flex-row text-center"
          >
            <NavigationPane />
            <div className="flex flex-col flex-grow">{children} </div>
          </div>
        </div>
      </body>
    </html>
  );
}
