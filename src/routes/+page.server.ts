import { error } from '@sveltejs/kit';
import { parse } from 'csv-parse';
import { Readable } from 'node:stream';
import type { ReadableStream } from 'node:stream/web';
import type { Actions } from './$types';

export const actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const file = form.get('file') as File | null;

    if (!file) {
      return error(400, 'No file provided');
    }
    const stream = Readable.fromWeb(file.stream() as ReadableStream);

    const parser = stream.pipe(parse());
    const records = [];
    for await (const record of parser) {
      records.push(record);
    }
    return { records };
  }
} satisfies Actions;
