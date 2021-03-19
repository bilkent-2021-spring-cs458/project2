package tr.com.bilkent.survey_testing;

import java.time.Duration;
import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import io.appium.java_client.MobileBy;
import io.appium.java_client.MobileDriver;
import io.appium.java_client.TouchAction;
import io.appium.java_client.touch.WaitOptions;
import io.appium.java_client.touch.offset.PointOption;

public class AppModel {
	private static final By START_SURVEY = MobileBy.AccessibilityId("formInitBtn");
	private static final By SUBMIT = MobileBy.AccessibilityId("submissionBtn");

	private static final By GO_BACK = MobileBy.AccessibilityId("navBtnForm");
	private static final By SUBMITTED_GO_HOME = MobileBy.AccessibilityId("homeNavBtn");
	private static final By EDIT_RESPONSE = MobileBy.AccessibilityId("formNavBtn");

	private static final By NAME = MobileBy.AccessibilityId("nameInput");
	private static final By SURNAME = MobileBy.AccessibilityId("surnameInput");
	private static final By BIRTH_DATE = MobileBy.AccessibilityId("birthDateInput");
	private static final By CITY = MobileBy.AccessibilityId("cityInput");
	private static final By GENDER = MobileBy.AccessibilityId("genderSelection");
	private static final By VACCINE_TYPE = MobileBy.AccessibilityId("vaccineSelection");
	private static final By SIDE_EFFECTS = MobileBy.AccessibilityId("sideEffectSelection");

	private static final By RANDOM_DATE = By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/"
			+ "android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/"
			+ "android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup[3]/android.view.ViewGroup/"
			+ "android.view.ViewGroup/android.view.ViewGroup[5]/android.view.ViewGroup[1]");

	private static final int SLEEP_AMOUNT = 250;

	private MobileDriver<WebElement> driver;

	public AppModel(MobileDriver<WebElement> driver) {
		this.driver = driver;

		if (!canStartSurvey()) {
			goHome();
		}
	}

	public void startSurvey() {
		driver.findElement(START_SURVEY).click();
		sleep();
	}

	public void submitSurvey() {
		driver.findElement(SUBMIT).click();
		sleep();
	}

	public void enterName(String name) {
		driver.findElement(NAME).sendKeys(name);
		sleep();
	}

	public void enterSurname(String surname) {
		driver.findElement(SURNAME).sendKeys(surname);
		sleep();
	}

	public void enterBirthDate(String bdate) {
		// Due to Appium limitations, cannot test actual bdate value
		driver.findElement(BIRTH_DATE).click();
		driver.findElement(RANDOM_DATE).click();
		sleep();
	}

	public void enterGender(String gender) {
		driver.findElement(GENDER).click();
		driver.findElementByAccessibilityId(gender).click();
		sleep();
	}

	public void enterCity(String city) {
		driver.findElement(CITY).sendKeys(city);
		sleep();
	}

	public void enterVaccineType(String type) {
		driver.findElement(VACCINE_TYPE).click();
		driver.findElementByAccessibilityId(type).click();
		sleep();
	}

	public void toggleSideEffect(String sideEffect) {
		toggleSideEffects(List.of(sideEffect));
	}

	public void toggleSideEffects(List<String> sideEffects) {
		if (sideEffects.isEmpty())
			return;

		driver.findElement(SIDE_EFFECTS).click();
		sideEffects.forEach(sideEffect -> driver.findElementByAccessibilityId(sideEffect).click());
		loseFocus();
		sleep();
	}

	public void fillForm(String name, String surname, String bdate, String city, String gender, String vaccine,
			List<String> sideEffects) {
		enterName(name);
		enterSurname(surname);
		enterBirthDate(bdate);
		enterCity(city);
		enterGender(gender);
		enterVaccineType(vaccine);
		toggleSideEffects(sideEffects);
	}

	public String getName() {
		return driver.findElement(NAME).getText();
	}

	public String getSurname() {
		return driver.findElement(SURNAME).getText();
	}

	public String getCity() {
		return driver.findElement(CITY).getText();
	}

	public String getBirthDate() {
		return driver.findElement(BIRTH_DATE).findElement(By.xpath("//android.widget.TextView")).getText();
	}

	public String getGender() {
		return driver.findElement(GENDER).findElement(By.xpath("//android.widget.TextView[@text!='Gender']")).getText();
	}

	public String getVaccine() {
		return driver.findElement(VACCINE_TYPE)
				.findElement(By.xpath("//android.widget.TextView[@text!='Vaccine Type']")).getText();
	}

	public String getSideEffects() {
		return driver.findElement(SIDE_EFFECTS)
				.findElement(By.xpath("//android.widget.TextView[@text!='Side Effects']")).getText();
	}

	public boolean canStartSurvey() {
		return doesExist(START_SURVEY);
	}

	public boolean isSubmitButtonVisible() {
		try {
			WebElement btn = driver.findElement(SUBMIT);
			return btn != null && btn.isDisplayed();
		} catch (Exception e) {
			return false;
		}
	}

	public boolean isSubmitted() {
		return doesExist(SUBMITTED_GO_HOME);
	}

	public void goBack() {
		driver.findElement(GO_BACK).click();
		sleep();
	}

	public void goHomeAfterSurvey() {
		driver.findElement(SUBMITTED_GO_HOME).click();
	}

	public void goHome() {
		if (doesExist(GO_BACK)) {
			goBack();
		} else {
			goHomeAfterSurvey();
		}
		sleep();
	}

	public void editResponse() {
		driver.findElement(EDIT_RESPONSE).click();
	}

	private void sleep() {
		try {
			Thread.sleep(SLEEP_AMOUNT);
		} catch (InterruptedException e) {
			Thread.currentThread().interrupt();
		}
	}

	private void loseFocus() {
		new TouchAction<>(driver).press(PointOption.point(0, 100))
				.waitAction(WaitOptions.waitOptions(Duration.ofMillis(100))).release().perform();
	}

	private boolean doesExist(By selector) {
		return !driver.findElements(selector).isEmpty();
	}
}
