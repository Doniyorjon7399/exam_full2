import { SetMetadata } from "@nestjs/common";

const isPublic=(value:boolean=false)=>SetMetadata('is_public',value);
export default isPublic