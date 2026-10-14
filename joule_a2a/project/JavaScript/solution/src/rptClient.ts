import { RptClient } from "@sap-ai-sdk/rpt/dist/client.js";
import type { RPT1Payload } from "./types.js";

// RPT-1 (sap-rpt-1.6) deployment ID.
const RPT1_DEPLOYMENT_ID = "d76cf689a05d504f";

export class RPT1Client {
  private client: RptClient;

  constructor(
    modelDeployment: {
      deploymentId: string;
      resourceGroup?: string;
    } = {
      deploymentId: RPT1_DEPLOYMENT_ID,
      resourceGroup: process.env.RESOURCE_GROUP!,
    },
  ) {
    this.client = new RptClient(modelDeployment);
  }

  async predictWithoutSchema(payload: RPT1Payload): Promise<any> {
    const prediction = await this.client.predictWithoutSchema(payload as any);
    return prediction;
  }
}
