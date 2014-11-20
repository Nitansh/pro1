package com.nitansh.game;

import java.io.IOException;
import android.content.Context;
import android.content.res.AssetFileDescriptor;
import android.media.MediaPlayer;
import android.webkit.JavascriptInterface;

public class AudioInterface {
	Context mContext;
	MediaPlayer mp; 
	
	AudioInterface(Context c) {
		mContext = c;
	}
	@JavascriptInterface
	public void stopAudio(){
		mp.pause();
		mp.seekTo(0);
	}
	
	@JavascriptInterface
	public void playAudio(){
		mp.start();
	}
	
	//Play an audio file from the webpage
	@JavascriptInterface
	public void CreateAudio(String aud, boolean flag, float val) { //String aud - file name passed 
	                                    //from the JavaScript function
		

			  try {
				  AssetFileDescriptor fileDescriptor = 
				  		mContext.getAssets().openFd(aud);
              	                  mp = new MediaPlayer();
              	                  mp.setDataSource(fileDescriptor.getFileDescriptor(), 
              	                  fileDescriptor.getStartOffset(), 
              	                  fileDescriptor.getLength());
              	                  fileDescriptor.close();
              	                  mp.prepare();
              	                  mp.setLooping(flag);
              	                  mp.setVolume(val, val);
              	                              	                  
			  } catch (IllegalArgumentException e) {
	                          // TODO Auto-generated catch block
	                          e.printStackTrace();
	          	  } catch (IllegalStateException e) {
	                          // TODO Auto-generated catch block
	                          e.printStackTrace();
	          	  } catch (IOException e) {
	                          // TODO Auto-generated catch block
	                          e.printStackTrace();
	          } 
	}
}