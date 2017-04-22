import {Component, OnInit, AfterViewChecked, ElementRef, ViewChild} from '@angular/core';
import {AF} from "../../providers/af";
import {FirebaseListObservable} from "angularfire2";
 import {Observable} from 'rxjs/Rx';
 import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';


@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.css']
})
export class NewsPageComponent implements OnInit {
  public news: FirebaseListObservable<any[]>;
    public newscomments: FirebaseListObservable<any[]>;

  public newNewsContent: string;
  public newNewsSubject: string;
  public newNewsCategory: string;
    public newsitemSubject: string;
    public newsitemContent: string;
    public newNewsItemComment: string;
    public newsitemCategory: string;
  public oldCategory: string;
    public oldSubject: string;
    public oldContent: string;
     newsPosts: any[] = this.afService.news;
    

  newsPostsFilter: any = { subject: '', category: ''};

  constructor(public afService: AF) {
    this.news = this.afService.news;
      this.newscomments = this.afService.newscomments;

  }
    
    
    
      ngOnInit() {
  
}
    
               deleteNewsComment(newsCommentKey: string) {
        this.afService.deleteNewsComment(newsCommentKey);
      }  
    
      sendNews()
{
    this.afService.sendNews(this.newNewsCategory, this.newNewsSubject, this.newNewsContent );
    this.newNewsContent = '';
    this.newNewsSubject = '';
    this.newNewsCategory = ''; 
  }
    
   startedit(newsitemCategory: string, newsitemSubject: string, newsitemContent: string)
    {
    this.oldSubject = newsitemSubject;
    this.oldCategory = newsitemCategory;
    this.oldContent = newsitemContent;
        console.log("t1:" + this.oldCategory + this.oldSubject + this.oldContent)
    }
    
          editNewsItem(newsitemKey: string, newNewsCategory: string, newNewsSubject: string, newNewsContent: string)
{
    console.log("AAAAAAAAAAAAAAA:" + newsitemKey + newNewsCategory + newNewsSubject + newNewsContent)
    this.afService.editNewsItem(newsitemKey, newNewsCategory, newNewsSubject, newNewsContent);

  }
  
    
   canceledit(newsitemKey: string, newsitemCategory: string, newsitemSubject: string, newsitemContent: string) {

    newsitemSubject = this.oldSubject;
    newsitemCategory = this.oldCategory;
    newsitemContent= this.oldContent;
                 console.log("t2:" + newsitemKey + this.oldCategory + this.oldSubject + this.oldContent)


  }
    
    deleteNewsItem(newsitemKey: string) {
        this.afService.deleteNewsItem(newsitemKey);
      }
    
    
          sendNewsItemComment(newsitemKey: string){
    this.afService.sendNewsItemComment(newsitemKey, this.newNewsItemComment);
    this.newNewsItemComment = '';
  }
    
    commentClear()
    {
            this.newNewsItemComment = '';

    }
 
}
