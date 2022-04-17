import { Injectable, Logger } from '@nestjs/common';
import { Cluster } from 'puppeteer-cluster';
import { CreateFilePdfRecoverDto } from './dto/create-file-pdf-recover.dto';
import { UpdateFilePdfRecoverDto } from './dto/update-file-pdf-recover.dto';
import * as http from 'http';
import * as https from 'https';
import * as fs from 'fs';
import * as needle from 'needle';
import * as download from 'download';
import { SavePathService } from '../service';
import { Paths } from 'src/queries/models';

@Injectable()
export class FilePdfRecoverService {
  private logger = new Logger(FilePdfRecoverService.name);

  constructor(private savePathService: SavePathService) {}
  private async run(
    savePaths: (paths?: any[], newLinks?: any[]) => Promise<any[]>,
  ) {
    try {
      const URL = process.env.URL_RAPPORT;

      const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_PAGE,
        maxConcurrency: 2,
        monitor: true,
        timeout: 500000,
        puppeteerOptions: {
          headless: false,
          args: ['--no-sandbox', '--disable-gpu'],
          slowMo: 250,
        },
        skipDuplicateUrls: true,
      });

      cluster.on('taskerror', async (errors, data, willRetry) => {
        this.logger.error({
          message: 'Something went wrong on the scrapping.',
          errors,
          data,
          willRetry,
        });
      });

      await cluster.task(async ({ page, data: url }) => {
        await page.goto(url);
        console.log('-- START --');

        await page.waitForSelector('a');
        console.log('-- LOADING --');
        const links: string[] = await page.$$eval('a', (tds) =>
          tds.map(({ textContent }) => textContent),
        );
        console.log('-- RECOVERY ALL LINKS --');

        const name = 'Name';
        const size = 'Size';
        const parentDirectory = 'Parent Directory';
        const description = 'Description';
        const LastModified = 'Last modified';
        const paths = [];
        const newLinks = [];
        for await (const link of links) {
          if (
            link.trim() !== name &&
            link.trim() !== size &&
            link.trim() !== parentDirectory &&
            link.trim() !== description &&
            link.trim() !== LastModified
          ) {
            const baseUrl = link.trim();
            newLinks.push(baseUrl);
            paths.push(`${URL}${baseUrl}`);
          }
        }

        await savePaths(paths, newLinks);
      });

      await cluster.queue(process.env.URL_RAPPORT);

      // Shutdown after everything is done
      await cluster.idle();
      await cluster.close();
    } catch (e) {
      this.logger.error({
        message: 'Something went wrong',
        errors: e,
      });
    }
  }

  async findOne() {
    let pathsT;
    await this.run(async (paths, newLinks) => {
      await this.createPath(paths, newLinks);
      pathsT = paths;
      return pathsT;
    });
    return pathsT;
  }

  private async createPath(paths: string[], newLinksPu: string[]) {
    const newLinks: Paths[] = [];
    for await (const path of paths) {
      newLinks.push({
        path,
      } as Paths);
    }
    await this.createFile(paths, newLinks, newLinksPu);
  }

  private async createFile(
    paths: string[],
    newLinks: Paths[],
    newLinksPu: string[],
  ) {
    // this.savePathService.bulkCreate(newLinks);
    let i = 0;

    while (i < paths.length && i < newLinksPu.length) {
      const dest = `${process.cwd()}/files/${newLinksPu[i]}`;
      // await download(paths[i], dest, { encoding: 'buffer' });
      // fs.writeFileSync(dest, await download(paths[i]));
      //  await Promise.all(
      //    ['unicorn.com/foo.jpg', 'cats.com/dancing.gif'].map((url) =>
      //      download(url, 'dist'),
      //    ),
      //  );
      const file = fs.createWriteStream(dest);
      needle
        .get(paths[i])
        .pipe(file)
        .on('done', () => {
          console.log('Download Completed');
        });
      // const request = await https.get(
      //   paths[i],
      //   {
      //     headers: {
      //       'content-type': 'application/pdf',
      //       'Content-Disposition': `attachment; ${newLinksPu[i]}`,
      //       'Content-Transfer-Encoding': 'binary',
      //       encoding: 'buffer',
      //     },
      //   },
      //   (response) => {
      //     response.pipe(file);

      //     // after download completed close filestream
      //     file.on('finish', () => {
      //       file.close();
      //       console.log('Download Completed');
      //     });
      //   },
      // );
      i++;
    }
  }

  create(createFilePdfRecoverDto: CreateFilePdfRecoverDto) {
    return 'This action adds a new filePdfRecover';
  }

  findAll() {
    return `This action returns all filePdfRecover`;
  }

  update(id: number, updateFilePdfRecoverDto: UpdateFilePdfRecoverDto) {
    return `This action updates a #${id} filePdfRecover`;
  }

  remove(id: number) {
    return `This action removes a #${id} filePdfRecover`;
  }
}
