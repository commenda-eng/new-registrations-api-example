import Image from "next/image";
import localFont from "next/font/local";
import { RegistrationFormStep } from "@/types/formDataTypes";
import MultiPageForm from "@/components/form";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

type ServerSidePropsResponse = {
  formData?: RegistrationFormStep[];
  error?: string;
};

export default function Home(props: ServerSidePropsResponse) {
  console.log(props);
  if (!props.formData) {
    return (
      <div
        className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
      >
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <p> Error: {props.error}</p>
        </main>
      </div>
    );
  }

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 w-[80vw]`}
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <MultiPageForm
          steps={props.formData}
          onSubmit={async (data: unknown) => {
            console.log(data);
            const formDataResponse = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/v1/registrations/new-registration/fields`,
              {
                method: "POST",
                body: JSON.stringify({
                  corporation_id: "f09a4897-3b16-4e47-aa82-3c1d189ab0c1",
                  country: "US",
                  state: "CA",
                  form_data: data,
                }),
                headers: {
                  "Content-Type": "application/json",
                  // Obviously don't do this in production:
                  Authorization: `Bearer ${process.env.NEXT_PUBLIC_ORGANIZATION_API_KEY}`,
                },
              }
            );

            if (!formDataResponse.ok) {
              console.error(await formDataResponse.json());
            }
          }}
        />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://sales-tax-docs.commenda.io/api-reference/sales-tax/registrations/registrations"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          API Documentation
        </a>
      </footer>
    </div>
  );
}

export async function getServerSideProps(): Promise<{
  props: ServerSidePropsResponse;
}> {
  const formDataResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/registrations/new-registration/fields?country=US&state=CA`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ORGANIZATION_API_KEY}`,
      },
    }
  );

  if (!formDataResponse.ok) {
    return { props: { error: await formDataResponse.json() } };
  }

  const formData = await formDataResponse.json();
  return { props: { formData: formData.data } };
}
