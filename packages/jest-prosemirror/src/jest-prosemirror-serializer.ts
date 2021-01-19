import { object } from '@remirror/core-helpers';
import type { MarkType, NodeType } from '@remirror/core-types';
import { isEditorSchema, isEditorState, isProsemirrorNode } from '@remirror/core-utils';
/**
 * Jest serializer for prosemirror nodes and the editor state.
 */
export const prosemirrorSerializer: jest.SnapshotSerializerPlugin = {
  test: (value) => isProsemirrorNode(value) || isEditorState(value) || isEditorSchema(value),
  print: (value) => {
    if (isEditorState(value)) {
      return `Prosemirror doc: ${JSON.stringify(
        value.doc.toJSON(),
        null,
        2,
      )}\nProsemirror selection: ${JSON.stringify(value.selection, null, 2)}`;
    }

    if (isEditorSchema(value)) {
      const nodes: Record<string, NodeType> = object();
      const marks: Record<string, MarkType> = object();

      for (const [name, type] of Object.entries(value.nodes)) {
        nodes[name] = type;
      }

      for (const [name, type] of Object.entries(value.marks)) {
        marks[name] = type;
      }

      return `Prosemirror schema: ${JSON.stringify(
        {
          nodes,
          marks,
        },
        null,
        2,
      )}`;
    }

    return `Prosemirror node: ${JSON.stringify(value, null, 2)}`;
  },
};
