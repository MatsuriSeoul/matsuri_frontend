import base64 from "base-64";

export default function DecodingInfo(jwtToken) {
    let payload = jwtToken.split('.')[1];
    let decodingInfo = base64.decode(payload);
    let decodingInfoJson = JSON.parse(decodingInfo);

    return decodingInfoJson;
}
