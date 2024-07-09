import {NextRequest} from "next/server";
import {serverClient} from "@/lib/server/serverClient";
import {gql} from "@apollo/client";
export async function POST(request: NextRequest) {
  const {query, variables} = await request.json();

  try {
    let result;
    if (query.trim().startsWith("mutation")) {
      result = await serverClient.mutate({
        mutation: gql`
        ${query}
        `,
        variables: variables,
      })
    } else {
      result = await serverClient.query({
        query: gql`
        ${query}
        `,
        variables: variables,
      });
    }

    const data = result.data;
    console.log(">>> DATA", data);

  } catch (error) {
    console.error(error);
  }
}
