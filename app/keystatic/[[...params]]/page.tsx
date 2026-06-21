import ClientApp from "./ClientApp";

export default async function Page(props: any) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  return <ClientApp params={params} searchParams={searchParams} />;
}
