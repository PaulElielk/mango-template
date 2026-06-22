import {
  createOrderRequest,
  SafeOrderError,
  type CreateOrderInput,
} from "@/lib/orders";

const FALLBACK_ERROR =
  "Impossible d'envoyer la demande pour le moment. Veuillez réessayer ou nous contacter directement par WhatsApp.";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const { orderNumber } = await createOrderRequest(body as CreateOrderInput);

    return Response.json({
      success: true,
      orderNumber,
    });
  } catch (error) {
    if (error instanceof SafeOrderError) {
      return Response.json(
        {
          success: false,
          message: error.message,
        },
        { status: 400 }
      );
    }

    console.error("[Orders API] unexpected failure:", error);

    return Response.json(
      {
        success: false,
        message: FALLBACK_ERROR,
      },
      { status: 500 }
    );
  }
}
