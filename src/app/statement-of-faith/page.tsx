import { Metadata } from 'next';
import { ScriptureTooltip } from '@/components/ui/ScriptureTooltip';

export const metadata: Metadata = {
  title: 'Statement of Faith | Pragmatic Truth',
  description: 'The seven foundational convictions held by contributors on Pragmatic Truth, grounded in Scripture.',
};

export default function StatementOfFaithPage() {
  return (
    <div className="w-full bg-white dark:bg-black min-h-screen pb-20">
      <section className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white">
            Statement of Faith
          </h1>
        </div>
      </section>

      <section className="container mx-auto max-w-3xl px-4 py-16">
        <div className="prose prose-lg dark:prose-invert prose-slate max-w-none text-slate-700 dark:text-slate-300">
          <p>
            The faith affirmed by the contributors on this site is the faith common to all believers, namely that:
          </p>

          <ol className="list-decimal pl-6 space-y-6 mt-8 mb-12 marker:text-primary marker:font-bold">
            <li className="pl-2">
              The Bible is the Word of God, written under His inspiration word by word (<ScriptureTooltip reference="2 Tim. 3:16" />), and is the complete and only written divine revelation of God to man (<ScriptureTooltip reference="Deut. 4:2" />; <ScriptureTooltip reference="Deut. 12:32" />; <ScriptureTooltip reference="Prov. 30:5-6" />; <ScriptureTooltip reference="Rev. 22:18-19" />);
            </li>
            <li className="pl-2">
              There is one God (<ScriptureTooltip reference="Deut. 6:4" />; <ScriptureTooltip reference="1 Cor. 8:4b" />; <ScriptureTooltip reference="Isa. 45:5a" />), who is triune—the Father, the Son, and the Spirit (<ScriptureTooltip reference="Matt. 28:19" />), co-existing (<ScriptureTooltip reference="Matt. 3:16-17" />; <ScriptureTooltip reference="2 Cor. 13:14" />) and coinhering (<ScriptureTooltip reference="John 14:10-11" />) in three persons, or hypostases, distinct but never separate, from eternity to eternity;
            </li>
            <li className="pl-2">
              Christ, the only begotten Son of God (<ScriptureTooltip reference="John 1:18" />; <ScriptureTooltip reference="John 3:16" />), even God Himself (<ScriptureTooltip reference="John 1:1" />), became a genuine man through incarnation (<ScriptureTooltip reference="John 1:14" />), having both the divine and human natures (<ScriptureTooltip reference="Rom. 9:5" />; <ScriptureTooltip reference="1 Tim. 2:5" />), the two natures being combined in one person and being preserved distinctly without confusion or change and without forming a third nature;
            </li>
            <li className="pl-2">
              Christ died for our sins and was raised bodily from the dead (<ScriptureTooltip reference="1 Cor. 15:3-4" />; <ScriptureTooltip reference="Acts 4:10" />; <ScriptureTooltip reference="Rom. 8:34" />), has been exalted to the right hand of God as Lord of all (<ScriptureTooltip reference="Acts 5:31" />; <ScriptureTooltip reference="Acts 10:36" />), and will return as the Bridegroom for His bride, the church (<ScriptureTooltip reference="John 3:29" />; <ScriptureTooltip reference="Rev. 19:7" />), and as the King of kings to rule over the nations (<ScriptureTooltip reference="Rev. 11:15" />; <ScriptureTooltip reference="Rev. 19:16" />);
            </li>
            <li className="pl-2">
              Salvation is by grace alone, through faith alone, in Christ alone (<ScriptureTooltip reference="Eph. 2:5" />, <ScriptureTooltip reference="Eph. 2:8" />) and in His completed work, resulting in our justification before God (<ScriptureTooltip reference="Rom. 3:24" />, <ScriptureTooltip reference="Rom. 3:28" />; <ScriptureTooltip reference="Gal. 2:16" />) and in our being born of God to be His children (<ScriptureTooltip reference="John 1:12-13" />);
            </li>
            <li className="pl-2">
              The church as the unique Body of Christ, the issue of the work of Christ (<ScriptureTooltip reference="Eph. 1:22-23" />), is composed of all genuine believers in Christ (<ScriptureTooltip reference="Rom. 12:5" />; <ScriptureTooltip reference="1 Cor. 12:12" />) and, according to the New Testament revelation, is manifested in time and space in local churches, each of which includes all the believers in a given city, regardless of where they meet or how they may otherwise identify themselves (<ScriptureTooltip reference="1 Cor. 1:2" />; <ScriptureTooltip reference="1 Thes. 1:1" />; <ScriptureTooltip reference="Rev. 1:11" />); and
            </li>
            <li className="pl-2">
              All the believers in Christ will participate in the divine blessings in the New Jerusalem in the new heaven and new earth for eternity (<ScriptureTooltip reference="Rev. 21:1-22:5" />).
            </li>
          </ol>

          <p>
            These seven items broadly represent what we hold as "the faith once for all delivered to the saints" (<ScriptureTooltip reference="Jude 3" />). Although our teachings on other, secondary items are also grounded in Scripture, we acknowledge that genuine believers have historically held to many differing interpretations on these matters and continue to do so today. Therefore we diligently practice to receive all those whom the Lord has received (<ScriptureTooltip reference="Rom. 14:3" />; <ScriptureTooltip reference="Rom. 15:7" />).
          </p>
        </div>
      </section>
    </div>
  );
}
