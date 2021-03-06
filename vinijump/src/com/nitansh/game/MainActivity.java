package com.nitansh.game;


import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdSize;
import com.google.android.gms.ads.AdView;
import com.nitansh.game.R;


import android.annotation.SuppressLint;
import android.annotation.TargetApi;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.pm.ActivityInfo;
import android.os.Build;
import android.os.Bundle;
import android.view.MotionEvent;
import android.view.View;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import android.widget.RelativeLayout;

@TargetApi(Build.VERSION_CODES.HONEYCOMB) public class MainActivity extends Activity {
	final Context myApp=this;
	private AdView adView;
	/** Called when the activity is first created. */
    @SuppressLint("SetJavaScriptEnabled") @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        
        setContentView(R.layout.activity_main);
        adView = new AdView(this);
        adView.setAdSize(AdSize.BANNER);
        adView.setAdUnitId("ca-app-pub-5047333943084311/4181724580");
        
        
        RelativeLayout layout = (RelativeLayout) findViewById(R.id.linear_layout);
        layout.addView(adView);
        
        AdRequest adRequest = new AdRequest.Builder()
        .build();

    // Start loading the ad in the background.
    adView.loadAd(adRequest);
    
        WebView mainWebView = (WebView) findViewById(R.id.mainWebView);
        
        mainWebView.setOnTouchListener(new View.OnTouchListener() {

    	    @SuppressLint("ClickableViewAccessibility") public boolean onTouch(View v, MotionEvent event) {
    	      return (event.getAction() == MotionEvent.ACTION_MOVE);
    	    }
    	});

        
        mainWebView.setWebViewClient(new WebViewClient());
        mainWebView.setWebChromeClient(new WebChromeClient(){

        	 // disable scroll on touch
        	

            public boolean onJsAlert(WebView view, String url, String message, final android.webkit.JsResult result)
            {
                new AlertDialog.Builder(myApp)
                .setTitle("Vini Jump")
                .setMessage(message)
                .setPositiveButton(android.R.string.ok,
                        new AlertDialog.OnClickListener()
                {
                    public void onClick(DialogInterface dialog, int wicht)
                    {
                        result.confirm();
                    }
                }).setCancelable(false)
                .create()
                .show();
                return true;
                
            };
                });
        
        WebSettings webSettings = mainWebView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);
        //mainWebView.setLayerType(View.LAYER_TYPE_SOFTWARE, null);
        mainWebView.setWebViewClient(new MyCustomWebViewClient());
        mainWebView.addJavascriptInterface(new AudioInterface(this), "AndAud");
        mainWebView.addJavascriptInterface(new AudioInterface(this), "AndJump");
        mainWebView.addJavascriptInterface(new AudioInterface(this), "AndCoin");
        mainWebView.addJavascriptInterface(new AudioInterface(this), "AndHero");
        mainWebView.addJavascriptInterface(new AudioInterface(this), "AndCracker");
        mainWebView.loadUrl("file:///android_asset/html/main.html");
    }
    
    private class MyCustomWebViewClient extends WebViewClient {
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            view.loadUrl(url);
            return true;
        }
    }
}