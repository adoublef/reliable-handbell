import { HTTPException, Handler, Output, Status, maxBytes, object, optional, parse, string } from "~/deps.ts";

export function handleIndex(): Handler {
    const dto = object({
        q: optional(string([maxBytes(8)]))
    });

    const parseDto = (data: unknown): Output<typeof dto> => {
        try {
            return parse(dto, data);
        } catch (error) {
            throw new HTTPException(Status.BadRequest, { message: "error parsing dto" });
        }
    };

    return c => {
        const { q: name } = parseDto(c.req.query());

        return c.html(<strong>hello {name ?? "world"} from deno</strong>);
    };
}