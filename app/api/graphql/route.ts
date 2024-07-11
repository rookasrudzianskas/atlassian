import {NextRequest, NextResponse} from "next/server";
import {serverClient} from "@/lib/server/serverClient";
import {gql} from "@apollo/client";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function POST(request: NextRequest) {
  const {query, variables} = await request.json();

  console.log("DEBUG 1", query);
  console.log("DEBUG 2", variables);

  try {
    let result;

    if (query.trim().startsWith("mutation")) {
      result = await serverClient.mutate({
        mutation: gql`
        ${query}
        `,
        variables,
      });
    } else {
      result = await serverClient.query({
        query: gql`
        ${query}
        `,
        variables,
      });
    }

    const data = result.data;
    console.log(">>> DATA", data, result);

    return NextResponse.json({
        data,
      },
      {
        headers: corsHeaders,
      }
    );

  } catch (error) {
    console.error("This is error>>>>", error);
    return NextResponse.json(
      error,
      {
        status: 500,
      });
  }
}
