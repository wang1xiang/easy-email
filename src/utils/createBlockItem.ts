import { BlockType } from '@/constants';
import { IBlockData, RecursivePartial } from '@/typings';
import { findBlockByType } from './block';

export function createBlockItem<T extends IBlockData>(
  type: BlockType,
  payload?: RecursivePartial<T>
): IBlockData {
  const component = findBlockByType(type);
  if (component) {
    return component.create(payload as any);
  }
  throw new Error(`No match \`${type}\` block`);
}
