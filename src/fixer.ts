import { Config } from "./config";
import { joinBlocks, parseBlocks } from "./parser";
import { ModelNameRule } from "./rules/model-name-rule";
import { formatSchema } from "./schema";

export const fix = async (content: string, config: Config): Promise<string> => {
  const blocks = parseBlocks(await formatSchema(content));

  if (config.rules["model-name"] !== undefined) {
    const configs = config.rules["model-name"];
    blocks.forEach((block) => ModelNameRule.apply(configs, block));
  }

  const fixedContent = joinBlocks(blocks);
  return formatSchema(fixedContent);
};
